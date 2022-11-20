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
    <div className="border-b-2 my-4 p-2 ">
      <div className="pb-2 flex justify-between w-full">
        <div className="text-2xl font-bold pb-4 ">{review.headline}</div>
        <div className=" text-right">
          {review.name} ({review.email}) at {review.createdAt.slice(0, 10)}
        </div>
      </div>
      <div>{review.content}</div>
      {review.rating && <div>Rating: {review.rating}</div>}
    </div>
  );
};
