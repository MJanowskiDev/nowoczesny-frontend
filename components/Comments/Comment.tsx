import { Review } from "../../graphql/generated/gql-types";
interface CommentProps {
  review: Review[
    | "headline"
    | "name"
    | "email"
    | "content"
    | "createdAt"
    | "rating"];
}
export const Comment = ({ review }: CommentProps) => {
  return (
    <div className="border-2 my-4">
      <div className="text-2xl font-bold">{review.headline}</div>
      <div>{review.name}</div>
      <div>{review.email}</div>
      <div>{review.content}</div>
      <div>{review.createdAt}</div>
      {review.rating && <div>Rating: {review.rating}</div>}
    </div>
  );
};
