import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema:
    "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/cla8iu8x60ux401t5hoqfe3k7/master",
  documents: "graphql/*.graphql",
  generates: {
    "graphql/generated/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
``;
