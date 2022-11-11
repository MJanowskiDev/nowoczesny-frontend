import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next/types";

import PaginationPage from "../../components/PaginationPage";
import { ProductsListGQL } from "../../components/ProductsListGQL";

import { NextSeo } from "next-seo";
import { getProducts } from "../../lib/getProducts";

export const PER_PAGE = 3;
const STATIC_PAGES = 2;

const ProductsSSG = ({
  products,
  currentPage,
  totalProducts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!products) {
    return <div>Coś poszło nie tak</div>;
  }

  return (
    <div>
      <NextSeo
        title="Products SSG"
        description={`About MJanowskiDev E-Commerce App products list, page ${currentPage}`}
      />
      <PaginationPage
        currentPage={currentPage}
        totalProducts={totalProducts}
        perPage={PER_PAGE}
        baseLink="products-ssg"
      />
      <ProductsListGQL data={products} baseLink="/products-ssg" />
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
