import { useCallback, useMemo, useState } from 'react';
import { contracts } from '../../../utils/constants';
import { compareAddress, parseUnits } from '@snx-v3/format';
import { CollateralType, useCollateralType } from '@snx-v3/useCollateralTypes';
import { useApprove } from '@snx-v3/useApprove';
import { useContract } from '../../../hooks/useContract';
import { MulticallCall, useMulticall } from '../../../hooks/useMulticall';
import { useUnWrapEth, useWrapEth } from '../../../hooks/useWrapEth';
import { useSetTransactionState } from '@snx-v3/useTransactionState';
import { BigNumber } from 'ethers';

export const useManagePosition = ({
  accountId,
  poolId,
  collateral,
  collateralChange,
  debtChange,
  collateralAmount,
  refetch,
}: {
  accountId: string;
  poolId: string;
  collateral: CollateralType;
  collateralChange: number;
  debtChange: number;
  collateralAmount: number;
  refetch?: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const snxProxy = useContract(contracts.SYNTHETIX_PROXY);
  const collateralChangeBN = parseUnits(Math.abs(collateralChange));

  const ethCollateral = useCollateralType('WETH');
  const isNativeCurrency = compareAddress(ethCollateral?.tokenAddress, collateral.tokenAddress);

  const { wrap, balance: wrapEthBalance, isLoading: isWrapping } = useWrapEth();
  const { unWrap, isLoading: isUnWrapping } = useUnWrapEth();

  const calls: MulticallCall[] = useMemo(() => {
    const list: MulticallCall[] = [];

    if (!snxProxy) return [];

    if (collateralChange > 0) {
      const currentAmount = parseUnits(collateralAmount);

      list.push(
        {
          contract: snxProxy?.contract,
          functionName: 'deposit',
          callArgs: [accountId, collateral.tokenAddress, collateralChangeBN],
        },
        {
          contract: snxProxy.contract,
          functionName: 'delegateCollateral',
          callArgs: [
            accountId,
            poolId,
            collateral.tokenAddress,
            currentAmount.add(collateralChangeBN),
            parseUnits(1, 18),
          ],
        }
      );
    }

    if (debtChange < 0) {
      const amount = parseUnits(-1 * debtChange);
      list.push({
        contract: snxProxy?.contract,
        functionName: 'burnUsd',
        callArgs: [accountId, poolId, collateral.tokenAddress, amount],
      });
    }

    if (debtChange > 0) {
      const amount = parseUnits(debtChange);
      list.push({
        contract: snxProxy?.contract,
        functionName: 'mintUsd',
        callArgs: [accountId, poolId, collateral.tokenAddress, amount],
      });
    }

    if (collateralChange < 0) {
      const currentAmount = parseUnits(collateralAmount);
      list.push(
        {
          contract: snxProxy.contract,
          functionName: 'delegateCollateral',
          callArgs: [
            accountId,
            poolId,
            collateral.tokenAddress,
            currentAmount.sub(collateralChangeBN),
            parseUnits(1, 18),
          ],
        },
        {
          contract: snxProxy.contract,
          functionName: 'withdraw',
          callArgs: [accountId, collateral.tokenAddress, collateralChangeBN],
        }
      );
    }

    return list;
  }, [
    snxProxy,
    collateralChange,
    debtChange,
    collateralAmount,
    collateral.tokenAddress,
    accountId,
    poolId,
    collateralChangeBN,
  ]);

  const multiTxn = useMulticall(calls);
  const { approve, requireApproval } = useApprove({
    contractAddress: collateral.tokenAddress,
    amount: collateralChange > 0 ? collateralChangeBN : BigNumber.from(0),
    spender: snxProxy?.address,
  });

  const multicallTitles = useMemo(() => {
    const title: string[] = [];
    if (collateralChange > 0) {
      title.push('Deposit ' + collateral.symbol.toUpperCase());
    } else if (collateralChange < 0) {
      title.push('Withdraw ' + collateral.symbol.toUpperCase());
    }

    if (debtChange > 0) {
      title.push('Mint snxUSD');
    } else if (debtChange < 0) {
      title.push('Burn snxUSD');
    }

    return title;
  }, [collateralChange, debtChange, collateral.symbol]);

  const setTransactionState = useSetTransactionState();
  const updateTransactions = useCallback(() => {
    const transactions = [];

    if (isNativeCurrency && collateralChange > 0) {
      transactions.push({
        title: 'Wrap ETH',
        subtitle: collateralChangeBN.gt(wrapEthBalance?.value || 0)
          ? 'You must wrap your ether before depositing.'
          : '',
        call: async (useBalance?: boolean) => {
          if (!useBalance) {
            await wrap(collateralChangeBN);
          }
        },
        checkboxLabel: collateralChangeBN.gt(wrapEthBalance?.value || 0)
          ? ''
          : `Skip this step and use my existing ${collateralChange} wETH.`,
        checked: false,
      });
    }

    if (collateralChange > 0 && requireApproval) {
      transactions.push({
        title: `Approve ${collateral.symbol.toUpperCase()} transfer`,
        subtitle: '',
        call: async (infiniteApproval?: boolean) => await approve(Boolean(infiniteApproval)),
        checkboxLabel: requireApproval
          ? `Approve unlimited ${collateral.symbol.toUpperCase()} transfers to Synthetix.`
          : '',
        checked: false,
      });
    }

    transactions.push({
      title: multicallTitles.join(', '),
      subtitle: 'This is a multicall.',
      call: async () => await multiTxn.exec(),
      checkboxLabel: '',
      checked: false,
    });

    if (isNativeCurrency && collateralChange < 0) {
      transactions.push({
        title: 'Unwrap ETH',
        subtitle: 'Convert wETH to native ETH.',
        call: async () => await unWrap(collateralChangeBN),
        checkboxLabel: '',
        checked: false,
      });
    }

    setTransactionState({
      transactions,
      isOpen: true,
      onSuccess: () => {
        if (refetch) {
          refetch();
        }
      },
    });
  }, [
    refetch,
    isNativeCurrency,
    collateralChange,
    multicallTitles,
    setTransactionState,
    collateralChangeBN,
    wrapEthBalance?.value,
    wrap,
    collateral.symbol,
    approve,
    multiTxn,
    unWrap,
    requireApproval,
  ]);

  const exec = useCallback(
    async (useDialog = true) => {
      if (useDialog) {
        return updateTransactions();
      }
      try {
        setIsLoading(true);
        if (isNativeCurrency && collateralChange > 0) {
          await wrap(collateralChangeBN);
        }
        await approve(false);
        await multiTxn.exec();
        if (isNativeCurrency && collateralChange < 0) {
          await unWrap(collateralChangeBN);
        }
        refetch?.();
      } catch (error) {
        //console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
    [
      updateTransactions,
      approve,
      collateralChange,
      collateralChangeBN,
      isNativeCurrency,
      multiTxn,
      refetch,
      unWrap,
      wrap,
    ]
  );

  return {
    isLoading: isLoading || isWrapping || isUnWrapping,
    exec,
  };
};
