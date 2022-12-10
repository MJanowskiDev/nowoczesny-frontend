import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../components/Layout";
import { QueryClient, QueryClientProvider } from "react-query";

import { DefaultSeo } from "next-seo";
import DefaultSeoConfig from "../next-seo.config";

import { CartStateContextProvider } from "../components/Cart/CartContext";

import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "../graphql/apolloClient";

import "../i18";
import { ClerkProvider } from "@clerk/nextjs";
import { useRouter } from "next/router";
const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  const isPubliPath = ["/"].includes(pathname);
  return (
    <ClerkProvider {...pageProps}>
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
    </ClerkProvider>
  );
}

export default MyApp;
