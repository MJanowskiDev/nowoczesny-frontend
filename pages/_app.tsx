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
import { ClerkProvider, RedirectToSignIn, SignedOut } from "@clerk/nextjs";
import { useRouter } from "next/router";
const client = new QueryClient();

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{
  session: Session;
}>) {
  const { pathname } = useRouter();

  const isPubliPath = ["/"].includes(pathname);
  return (
    <ClerkProvider {...pageProps}>
      <SessionProvider session={session}>
        <ApolloProvider client={apolloClient}>
          <QueryClientProvider client={client}>
            <CartStateContextProvider>
              <DefaultSeo {...DefaultSeoConfig} />
              <Layout>
                <Component {...pageProps} />
                {/* {!isPubliPath && (
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                )} */}
              </Layout>
            </CartStateContextProvider>
          </QueryClientProvider>
        </ApolloProvider>
      </SessionProvider>
    </ClerkProvider>
  );
}

export default MyApp;
