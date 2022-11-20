import { apolloClient } from "../graphql/apolloClient";
import {
  GetProductSlugsDocument,
  GetProductSlugsQuery,
} from "../graphql/generated/gql-types";

export const getProductSlugs = async (amount: number) => {
  const data = await apolloClient.query<GetProductSlugsQuery>({
    query: GetProductSlugsDocument,
    variables: { amount: amount },
  });

  return data;
};
