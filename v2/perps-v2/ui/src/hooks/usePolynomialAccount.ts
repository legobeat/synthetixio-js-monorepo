import { z } from 'zod';
import { POLYNOMIAL_SUBGRAPH_URL } from '../utils';
import { ApolloClient, gql, InMemoryCache, useQuery } from '@apollo/client';

const polyClient = new ApolloClient({
  uri: POLYNOMIAL_SUBGRAPH_URL,
  cache: new InMemoryCache(),
});

const AccountQuery = gql`
  query SmAccounts($owner: String) {
    logAccountCreateds(where: { owner: $owner }) {
      owner
      account
    }
  }
`;
const PolySmartMarginAccountsSchema = z.array(
  z.object({
    owner: z.string(),
    account: z.string(),
  })
);

const ResponseSchema = z
  .object({
    logAccountCreateds: PolySmartMarginAccountsSchema,
  })
  .optional();

export const usePolynomialAccount = (address?: string) => {
  const { data, ...rest } = useQuery(AccountQuery, {
    client: polyClient,
    variables: { owner: address },
    skip: !address,
  });
  const parsedData = ResponseSchema.parse(data);
  return { ...rest, data: parsedData?.logAccountCreateds.at(0) };
};
