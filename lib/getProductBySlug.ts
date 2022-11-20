import {
  GetProductBySlugQuery,
  GetProductBySlugDocument,
  Product,
} from "../graphql/generated/gql-types";
import { apolloClient } from "../graphql/apolloClient";

export const getProductBySlug = async (slug: Product["slug"]) => {
  const { data } = await apolloClient.query<GetProductBySlugQuery>({
    query: GetProductBySlugDocument,
    variables: { slug: slug },
  });

  return {
    data: data,
  };
};
