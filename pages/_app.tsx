import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../components/Layout";
import { QueryClient, QueryClientProvider } from "react-query";

import { DefaultSeo } from "next-seo";
import DefaultSeoConfig from "../next-seo.config";

import { CartStateContextProvider } from "../components/Cart/CartContext";

import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "../graphql/apolloClient";

import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

import "../i18";
const client = new QueryClient();

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{
  session: Session;
}>) {
  return (
    <SessionProvider session={session}>
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
    </SessionProvider>
  );
}

export default MyApp;
