import { useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import Wei, { wei } from '@synthetixio/wei';
import { z } from 'zod';
import { MARKETS_QUERY } from '../queries/dashboard';
import { DailyMarketStat_OrderBy } from '../__generated__/graphql';
import { getDateRange } from './useMarketStats';
import { perpsMarketDataContract } from './usePositions';
import { BytesLike, Contract, providers, utils } from 'ethers';
import {
  calculateMarkPrice,
  getMarketsPythConfig,
  PythConfigByMarketKey,
  pyth,
  scale,
} from '../utils';
import { PerpsV2MarketData } from '@synthetixio/contracts/build/mainnet-ovm/deployment/PerpsV2MarketData';
import { ZodStringToWei } from './useLargestOpenPosition';
import {
  abi as multiCallAbi,
  address as multiCallAddressGoerli,
  Multicall3,
} from './contracts/optimism-goerli/Multicall3';
import { address as multicallMainnetAddress } from './contracts/optimism-mainnet/Multicall3';
import { isStaging } from '../utils/isStaging';
import { infuraId } from '../utils';

const DataSchema = z.object({
  market: z.object({
    __typename: z.string().optional(),
    id: z.string(),
    marketKey: z.string(),
    asset: z.string(),
    isActive: z.boolean(),
    timestamp: z.string(),
  }),
  percentageDifference: ZodStringToWei,
  volume: z.string(),
  fundingRate: ZodStringToWei,
  indexPrice: ZodStringToWei,
  markPrice: ZodStringToWei,
  skew: ZodStringToWei,
  long: ZodStringToWei,
  short: ZodStringToWei,
  skewPercent: ZodStringToWei,
});

interface StateInterface {
  loading: boolean;
  data: z.infer<typeof DataSchema>[] | null;
  error: unknown | null;
}

const OPTIMISM_GOERLI_NETWORK_ID = 420;
const OPTIMISM__ID = 10;

const networkId = isStaging ? OPTIMISM_GOERLI_NETWORK_ID : OPTIMISM__ID;
const provider = new providers.InfuraProvider(networkId, infuraId);

const Multicall3Contract = new Contract(
  isStaging ? multiCallAddressGoerli : multicallMainnetAddress,
  multiCallAbi,
  provider
) as Multicall3;

export function useMarkets() {
  const [state, setState] = useState<StateInterface>({ loading: true, data: null, error: null });
  const client = useApolloClient();
  const { upper, lower } = getDateRange(2, 3);

  useEffect(() => {
    (async () => {
      try {
        const { data: marketData } = await client.query({
          query: MARKETS_QUERY,
          variables: {
            where: { day_gte: lower, day_lte: upper },
            orderBy: DailyMarketStat_OrderBy.Volume,
          },
        });

        // First, we want to get the highest for the current and previous dat
        const todaysResults =
          marketData?.dailyMarketStats.filter((market) => market.day === upper) || [];
        const yesterdaysResults =
          marketData?.dailyMarketStats.filter((market) => market.day === lower) || [];

        // Then we want to get the difference between the current day and the previous day
        const dataWithPercentageDifference = todaysResults.map((market) => {
          // Find the same market in yesterdays results
          const yesterday = yesterdaysResults.find((yesterdayMarket) => {
            return yesterdayMarket.market.id === market.market.id;
          });

          // In the off chance there was no volume yesterday we add a small amount
          const yesterdayVolume = wei(yesterday?.volume || 1, 18, true).add(wei(1).toBN());

          const percentageDifference = wei(market.volume, 18, true)
            .sub(wei(yesterday?.volume || 0, 18, true))
            .div(yesterdayVolume);

          return {
            ...market,
            percentageDifference,
          };
        });
        const pythConfigByMarketKey = await getMarketsPythConfig();
        const data = await fetchMarkets(dataWithPercentageDifference, pythConfigByMarketKey);

        setState({ loading: false, data, error: null });
      } catch (error) {
        setState({ loading: false, data: null, error });
      }
    })();
  }, [client, upper, lower]);

  return state;
}

interface FetchMarketsInterface {
  __typename?: 'DailyMarketStat';
  id: string;
  day: string;
  volume: string;
  market: {
    __typename?: 'FuturesMarket';
    id: string;
    marketKey: string;
    asset: string;
    isActive: boolean;
    timestamp: string;
  };
  percentageDifference: Wei;
}

export async function fetchMarkets(
  marketsData: FetchMarketsInterface[],
  pythConfigByMarketKey: PythConfigByMarketKey
): Promise<z.infer<typeof DataSchema>[] | null> {
  try {
    const allMarketSummaries = {
      target: perpsMarketDataContract.address,
      callData: perpsMarketDataContract.interface.encodeFunctionData('allMarketSummaries'),
    };

    const marketDetailCalls = marketsData.map(({ market }) => ({
      target: perpsMarketDataContract.address,
      callData: perpsMarketDataContract.interface.encodeFunctionData('marketDetailsForKey', [
        market.marketKey,
      ]),
    }));

    const dataWithPythId = marketsData.map((item) => {
      const marketKey = `${utils.parseBytes32String(item.market.marketKey)}`;
      const pythInfo = pythConfigByMarketKey[marketKey];
      return { pythId: pythInfo.pythId, ...item };
    });

    const [multiCallResponse, indexPrices] = await Promise.all([
      Multicall3Contract.callStatic.aggregate(marketDetailCalls.concat(allMarketSummaries)),
      pyth.getLatestPriceFeeds([...dataWithPythId.map(({ pythId }) => pythId)]),
    ]);

    const marketDetailsData = multiCallResponse.returnData.slice(0, marketDetailCalls.length);
    const allMarketSummariesData = multiCallResponse.returnData.slice(marketDetailCalls.length);

    const marketDetailsDataDecoded = marketDetailsData.map((item: BytesLike) => {
      return perpsMarketDataContract.interface.decodeFunctionResult('marketDetailsForKey', item)[0];
    });

    const allMarketSummariesDataDecoded = perpsMarketDataContract.interface.decodeFunctionResult(
      'allMarketSummaries',
      allMarketSummariesData[0]
    );

    return dataWithPythId
      .map(({ market, percentageDifference, volume }, index) => {
        const marketDetails = allMarketSummariesDataDecoded.flat()?.find((item) => {
          return item.key === market.marketKey;
        }) as PerpsV2MarketData.MarketSummaryStructOutput;

        const { fundingParameters, marketSizeDetails } = marketDetailsDataDecoded[index];

        // Get the index price from pyth
        let indexPrice: Wei = wei(0);
        if (indexPrices && indexPrices[index]) {
          const rawPriceInfo = indexPrices[index].getPriceUnchecked();
          indexPrice = scale(wei(rawPriceInfo?.price), rawPriceInfo?.expo || 1);
        }

        const skewWithScale = wei(marketDetails?.marketSkew, 18, true).div(
          wei(fundingParameters.skewScale, 18, true)
        );

        const markPrice = calculateMarkPrice(indexPrice, {
          skew: wei(marketDetails?.marketSkew, 18, true),
          indexPrice,
          skewScale: wei(fundingParameters.skewScale, 18, true),
        });

        return {
          market,
          percentageDifference,
          volume,
          fundingRate: wei(marketDetails?.currentFundingRate, 18, true).div(24),
          indexPrice,
          markPrice,
          skew: wei(marketDetails?.marketSkew, 18, true),
          long: wei(marketSizeDetails?.sides.long, 18, true),
          short: wei(marketSizeDetails?.sides.short, 18, true),
          skewPercent: skewWithScale.mul(100),
        };
      })
      .sort((a, b) => {
        return wei(b.volume, 18, true).toNumber() - wei(a.volume, 18, true).toNumber();
      });
  } catch (error) {
    console.error(error);
    return null;
  }
}
