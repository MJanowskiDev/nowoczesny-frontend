import { useGetReviewsForProductSlugQuery } from "../../graphql/generated/gql-types";
import ErrorMessage from "../UI/ErrorMessage";
import { Loading } from "../UI/Loading";
import { ProductReviewItem } from "./ProductReviewItem";
interface ProductReviewListProps {
  productSlug: string;
}

export const ProductReviewList = ({ productSlug }: ProductReviewListProps) => {
  const { data, loading, error } = useGetReviewsForProductSlugQuery({
    variables: { slug: productSlug },
  });

  if (loading) {
    return <Loading />;
  }

  if (!data?.product) {
    return null;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  if (!data.product.reviews.length) {
    return <p className="mt-10">This product has no reviews yet.</p>;
  }

  return (
    <div className="mt-10">
      <h1 className="text-4xl font-bold pb-4">Comments</h1>
      {data.product.reviews.map((review) => (
        <ProductReviewItem key={review.id} review={review} />
      ))}
    </div>
  );
};
