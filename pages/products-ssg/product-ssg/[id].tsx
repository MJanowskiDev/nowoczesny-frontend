import { useRouter } from "next/router";
import Link from "next/link";
import { Product } from "../../../components/Product";
import { ProductsAPIResponse } from "../../../utills";
import { PRODUCT_PAGES_AMOUNT, PRODUCT_TAKE_AMOUNT } from "../../../utills";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next/types";

interface ProductIdPageProps {
  data: ProductsAPIResponse;
}

const ProductIdPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const { id } = router.query;

  if (!data) {
    return <div>Coś poszło nie tak</div>;
  }

  return (
    <div>
      <Link href={"/products-ssg"}>
        <a>Go back</a>
      </Link>
      <Product
        data={{
          ...data,
        }}
      />
    </div>
  );
};

export const getStaticPaths = () => {
  const products = [...Array(PRODUCT_PAGES_AMOUNT * PRODUCT_TAKE_AMOUNT)].map(
    (_, i) => i + 1
  );
  return {
    paths: products.map((product) => {
      return { params: { id: product.toString() } };
    }),
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ id: string }>) => {
  if (!params?.id) {
    return { props: {}, notFound: true };
  }

  const res = await fetch(
    `https://naszsklep-api.vercel.app/api/products/${params.id}`
  );

  const data: ProductsAPIResponse = await res.json();

  return {
    props: {
      data,
    },
  };
};
export default ProductIdPage;
