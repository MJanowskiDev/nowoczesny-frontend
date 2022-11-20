import { useRouter } from "next/router";
import Link from "next/link";
import { ProductGQL } from "../../../components/ProductGQL";
import { PRODUCT_TAKE_AMOUNT } from "../../../utils";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next/types";
import { Loading } from "../../../components/Loading";

import { serialize } from "next-mdx-remote/serialize";
import { getProductBySlug } from "../../../lib/getProductBySlug";
import { getProductSlugs } from "../../../lib/getProductSlugs";
import { getReviews } from "../../../lib/getReviews";
import { AllComments } from "../../../components/Comments/AllComments";
import { CommentForm } from "../../../components/Comments/CommentForm";

const ProductIdPage = ({
  data,
  longDescription,
  reviews,
  id,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loading />;
  }

  if (!data) {
    return <div>Something went wrong...</div>;
  }

  return (
    <div>
      <Link href={"/products-ssg"}>
        <a>Go back</a>
      </Link>
      <ProductGQL product={data} longDescription={longDescription} />
      <CommentForm productId={id} />
      <AllComments reviews={reviews} />
    </div>
  );
};

export const getStaticPaths = async () => {
  const products = await getProductSlugs(PRODUCT_TAKE_AMOUNT);

  const slugArray = products.data.products.map((product) => product.slug);

  return {
    paths: slugArray.map((product) => {
      return { params: { slug: product.toString() } };
    }),
    fallback: true,
  };
};

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ slug: string }>) => {
  if (!params?.slug) {
    return { props: {}, notFound: true };
  }

  const { data } = await getProductBySlug(params.slug);

  if (!data.product) return { notFound: true };

  const reviewsData = await getReviews(data.product.id);

  return {
    props: {
      data: {
        ...data.product,
      },
      id: data.product.id,
      reviews: reviewsData.data.reviews,
      longDescription: await serialize(data.product.description),
    },
  };
};
export default ProductIdPage;
