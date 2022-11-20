import { apolloClient } from "../graphql/apolloClient";
import {
  ProductReviewsQueryQuery,
  ProductReviewsQueryDocument,
  ProductReviewsQueryQueryVariables,
} from "../graphql/generated/gql-types";

export const getReviews = async (
  productId: ProductReviewsQueryQueryVariables["id"]
) => {
  const { data } = await apolloClient.query<
    ProductReviewsQueryQuery,
    ProductReviewsQueryQueryVariables
  >({
    query: ProductReviewsQueryDocument,
    variables: { id: productId },
  });

  return {
    data: data,
  };
};
