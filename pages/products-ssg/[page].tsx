import { GetStaticPropsContext, InferGetStaticPropsType } from "next/types";
import { Pagination } from "../../components/Pagination";
import { ProductsListGQL } from "../../components/ProductsListGQL";

import { apolloClient } from "../../graphql/apolloClient";

import {
  GetProductsListDocument,
  GetProductsListQuery,
} from "../../graphql/generated/graphql";

import { NextSeo } from "next-seo";

import { PRODUCT_PAGES_AMOUNT, PRODUCT_TAKE_AMOUNT } from "../../utils";

interface ProductsGQL {
  id: string;
  slug: string;
  name: string;
  price: number;
  images: {
    url: string;
  };
}

const ProductsSSG = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!data) {
    return <div>Coś poszło nie tak</div>;
  }

  return (
    <div>
      <NextSeo
        title="Products SSG"
        description="About MJanowskiDev E-Commerce App products list"
      />
      <ProductsListGQL data={data} baseLink="/products-ssg" />
      <Pagination
        baseLink="products-ssg"
        pages={[...Array(PRODUCT_PAGES_AMOUNT)].map((_, i) => i + 1)}
      />
    </div>
  );
};

export const getStaticPaths = () => {
  const pages = [...Array(PRODUCT_PAGES_AMOUNT)].map((_, i) => i + 1);

  return {
    paths: pages.map((page) => {
      return { params: { page: page.toString() } };
    }),
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ page: string }>) => {
  if (!params?.page) {
    return { props: {}, notFound: true };
  }

  const take = PRODUCT_TAKE_AMOUNT;
  const offset = (Number(params.page) - 1) * take;

  const { data } = await apolloClient.query<GetProductsListQuery>({
    query: GetProductsListDocument,
  });

  return {
    props: {
      data,
    },
  };
};

export default ProductsSSG;
