import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../components/Layout";
import { QueryClient, QueryClientProvider } from "react-query";

import { DefaultSeo } from "next-seo";
import DefaultSeoConfig from "../next-seo.config";

import { CartStateContextProvider } from "../components/Cart/CartContext";

import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "../graphql/apolloClient";
const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <QueryClientProvider client={client}>
        <CartStateContextProvider>
          <DefaultSeo {...DefaultSeoConfig} />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CartStateContextProvider>
      </QueryClientProvider>
    </ApolloProvider>
  );
}

export default MyApp;
