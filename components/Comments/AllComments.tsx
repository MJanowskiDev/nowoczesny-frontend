import { ProductReviewsQueryQuery } from "../../graphql/generated/gql-types";
import { Comment } from "./Comment";
interface AllCommentsProps {
  reviews: ProductReviewsQueryQuery["reviews"];
}
export const AllComments = ({ reviews }: AllCommentsProps) => {
  return (
    <>
      {reviews.edges.map((review) => (
        <Comment key={review.node.id} review={review.node} />
      ))}
    </>
  );
};
