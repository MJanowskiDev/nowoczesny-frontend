import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next/types";

import PaginationPage from "../../components/PaginationPage";
import { ProductsListGQL } from "../../components/ProductsListGQL";

import { NextSeo } from "next-seo";
import { getProducts } from "../../lib/getProducts";
import { serialize } from "next-mdx-remote/serialize";

export const PER_PAGE = 6;
const STATIC_PAGES = 2;

const ProductsSSG = ({
  products,
  currentPage,
  totalProducts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!products) {
    return <div>Something went wrong...</div>;
  }

  return (
    <div>
      <NextSeo
        title="Products SSG"
        description={`About MJanowskiDev E-Commerce App products list, page ${currentPage}`}
      />
      <div>
        <ProductsListGQL data={products} baseLink="/products-ssg/product" />
        <PaginationPage
          currentPage={currentPage}
          totalProducts={totalProducts}
          perPage={PER_PAGE}
          baseLink="products-ssg"
        />
      </div>
    </div>
  );
};

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ page: string }>) => {
  const page = Number(params?.page) || 1;
  const { total, data } = await getProducts({ limit: PER_PAGE, page });

  if (!data.products.length) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      totalProducts: total,
      currentPage: page,
      products: data,
    },
    revalidate: 60 * 60 * 24, //once a day
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  const pages = [...Array(STATIC_PAGES)].map((_, i) => i + 1);

  return {
    paths: pages.map((page) => {
      return { params: { page: page.toString() } };
    }),
    fallback: "blocking",
  };
};

export default ProductsSSG;
