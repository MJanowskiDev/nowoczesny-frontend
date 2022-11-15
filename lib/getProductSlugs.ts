import { apolloClient } from "../graphql/apolloClient";
import { GetProductSlugsDocument } from "../graphql/generated/graphql";

export const getProductSlugs = async (amount: number) => {
  const data = await apolloClient.query({
    query: GetProductSlugsDocument,
    variables: { amount: amount },
  });

  return data;
};
