import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'https://api.thegraph.com/subgraphs/name/synthetix-perps/perps',
  documents: ['src/**/*.ts'],
  generates: {
    './src/__generated__/': {
      preset: 'client',
      plugins: [],
      config: {
        scalars: {
          Bytes: 'string',
          BigInt: 'string',
          BigDecimal: 'string',
        },
      },
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
