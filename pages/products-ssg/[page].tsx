import { GetStaticPropsContext, InferGetStaticPropsType } from "next/types";
import { Pagination } from "../../components/Pagination";
import { ProductsList } from "../../components/ProductsList";

import {
  ProductsAPIResponse,
  PRODUCT_PAGES_AMOUNT,
  PRODUCT_TAKE_AMOUNT,
} from "../../utils";

const ProductsSSG = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!data) {
    return <div>Coś poszło nie tak</div>;
  }

  return (
    <div>
      <ProductsList data={data} link="product-ssg" />
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

  const res = await fetch(
    `https://naszsklep-api.vercel.app/api/products?take=${take}&offset=${offset}`
  );

  const data: ProductsAPIResponse[] = await res.json();

  return {
    props: {
      data,
    },
  };
};

export default ProductsSSG;
