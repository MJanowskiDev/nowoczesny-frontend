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
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { useRouter } from "next/router";
const client = new QueryClient();

const publicPages: string[] = [
  "/",
  "/about",
  "/sign-in/[[...index]]",
  "/sign-up/[[...index]]",
  "/products-ssg/[page]",
  "/products-ssg/product/[slug]",
];

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  const isPublicPage = publicPages.includes(pathname);
  return (
    <ClerkProvider {...pageProps}>
      <ApolloProvider client={apolloClient}>
        <QueryClientProvider client={client}>
          <CartStateContextProvider>
            <DefaultSeo {...DefaultSeoConfig} />
            <Layout>
              {isPublicPage ? (
                <Component {...pageProps} />
              ) : (
                <>
                  <SignedIn>
                    <Component {...pageProps} />
                  </SignedIn>
                  <SignedOut>{<RedirectToSignIn />}</SignedOut>
                </>
              )}
            </Layout>
          </CartStateContextProvider>
        </QueryClientProvider>
      </ApolloProvider>
    </ClerkProvider>
  );
}

export default MyApp;
