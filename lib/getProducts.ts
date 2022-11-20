import { apolloClient } from "../graphql/apolloClient";
import {
  ProductsWithPaginationQueryQuery,
  ProductsWithPaginationQueryDocument,
} from "../graphql/generated/gql-types";

export async function getProducts({
  limit,
  page,
}: {
  limit: number;
  page: number;
}) {
  const { data } = await apolloClient.query<ProductsWithPaginationQueryQuery>({
    query: ProductsWithPaginationQueryDocument,
    variables: { limit: limit, offset: (page - 1) * limit },
  });

  return {
    total: data.productsConnection.aggregate.count,
    data: data,
  };
}
