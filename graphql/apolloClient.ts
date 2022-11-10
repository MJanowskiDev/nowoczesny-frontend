import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/cl9yjmpxu1yan01uo9d1566mw/master",
  cache: new InMemoryCache(),
});
