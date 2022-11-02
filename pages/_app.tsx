import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../components/Layout";
import { QueryClient, QueryClientProvider } from "react-query";

import { DefaultSeo } from "next-seo";
import DefaultSeoConfig from "../next-seo.config";

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={client}>
      <DefaultSeo {...DefaultSeoConfig} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
}

export default MyApp;
