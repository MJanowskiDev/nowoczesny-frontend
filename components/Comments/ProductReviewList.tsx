import {
  useGetReviewsForProductSlugQuery,
  ReviewContentFragment,
} from "../../graphql/generated/gql-types";
import { ProductReviewItem } from "./ProductReviewItem";
interface ProductReviewListProps {
  productSlug: string;
}

export const ProductReviewList = ({ productSlug }: ProductReviewListProps) => {
  const { data, loading, error } = useGetReviewsForProductSlugQuery({
    variables: { slug: productSlug },
  });

  if (!data?.product) {
    return null;
  }

  return (
    <>
      <h1 className="text-5xl font-bold pb-4">Comments</h1>
      {data.product.reviews.map((review) => (
        <ProductReviewItem key={review.id} review={review} />
      ))}
    </>
  );
};
