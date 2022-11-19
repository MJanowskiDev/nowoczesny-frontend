import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.CMS_URL,
  documents: "graphql/*.graphql",
  generates: {
    "graphql/generated/": {
      preset: "client",
      plugins: ["typescript-react-apollo"],
    },
  },
};

export default config;
``;
