import { detectEthereumProvider } from './metamask-detect-provider';
import { DEFAULT_GAS_BUFFER, DEFAULT_NETWORK_ID } from 'constants/defaults';
import { NetworkId } from '@synthetixio/contracts-interface';
import { GasLimitEstimate } from 'constants/network';
import Wei, { wei } from '@synthetixio/wei';
import { GWEI_DECIMALS, GWEI_UNIT } from './infura';
import { GasPrice } from '@synthetixio/queries';

export async function getDefaultNetworkId(): Promise<NetworkId> {
	try {
		const provider = await detectEthereumProvider();
		if (provider && provider.chainId) {
			return Number(provider.chainId);
		}
		return DEFAULT_NETWORK_ID;
	} catch (e) {
		console.log(e);
		return DEFAULT_NETWORK_ID;
	}
}

export const getGweiGasPriceOrMaxFee = (gasPriceObj?: GasPrice | null) => {
	if (!gasPriceObj) return wei(0);
	const { maxFeePerGas, gasPrice } = gasPriceObj;
	if (gasPrice) {
		return wei(gasPrice, GWEI_DECIMALS);
	}
	return wei(maxFeePerGas || 0, GWEI_DECIMALS);
};

export const getTransactionPrice = (
	gasPrice: GasPrice | null,
	gasLimit: GasLimitEstimate,
	ethPrice: Wei | null,
	optimismL1Fees?: Wei
) => {
	if (!gasPrice || !gasLimit || !ethPrice) return null;
	const totalGasPrice = getGweiGasPriceOrMaxFee(gasPrice);

	const extraLayer1Fees = optimismL1Fees?.mul(GWEI_UNIT); // optimismL1Fees comes in ETH
	const txPrice = totalGasPrice
		.mul(gasLimit)
		.add(extraLayer1Fees || 0)
		.mul(ethPrice)
		.div(GWEI_UNIT);

	return txPrice;
};

export const normalizeGasLimit = (gasLimit: number) => gasLimit + DEFAULT_GAS_BUFFER;

export const normalizedGasPrice = (gasPrice: number) => gasPrice * GWEI_UNIT;

export const getIsOVM = (networkId: number): boolean => !!~[10, 69].indexOf(networkId);
export const matchesNetworkErrorString = (error: string) =>
	error.includes('unsupported network or network id passed');

export const networkErrorMessage = 'Wrong network detected';
