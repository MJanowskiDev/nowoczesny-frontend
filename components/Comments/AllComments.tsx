import { ProductReviewsQueryQuery } from "../../graphql/generated/gql-types";
import { Comment } from "./Comment";
interface AllCommentsProps {
  reviews: ProductReviewsQueryQuery["reviews"];
}
export const AllComments = ({ reviews }: AllCommentsProps) => {
  return (
    <>
      <h1 className="text-5xl font-bold pb-4">Comments</h1>
      {reviews.edges.map((review) => (
        <Comment key={review.node.id} review={review.node} />
      ))}
    </>
  );
};
