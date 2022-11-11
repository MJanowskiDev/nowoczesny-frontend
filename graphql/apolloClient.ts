import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/cla8iu8x60ux401t5hoqfe3k7/master",
  cache: new InMemoryCache(),
});
