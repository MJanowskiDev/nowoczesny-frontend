import { Input } from "../Form/Input";
import { Textarea } from "../Form/Textarea";
import { SubmitButton } from "../Form/SubmitButton";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import {
  useCreateProductReviewMutation,
  usePublishProductReviewMutation,
  GetReviewsForProductSlugDocument,
  GetReviewsForProductSlugQuery,
} from "../../graphql/generated/gql-types";
import { yupResolver } from "@hookform/resolvers/yup";

const commentFormSchema = yup.object({
  headline: yup.string().required(),
  name: yup.string().required(),
  email: yup.string().required().email(),
  content: yup.string().required(),
  rating: yup.number().min(1).max(5).required(),
});

type ProductReviewFormData = yup.InferType<typeof commentFormSchema>;

interface ProductReviewFormProps {
  productSlug: string;
}

export const ProductReviewForm = ({ productSlug }: ProductReviewFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<ProductReviewFormData>({
    resolver: yupResolver(commentFormSchema),
  });

  const [createReview, createReviewResult] = useCreateProductReviewMutation({
    update(cache, result) {
      const originalReviewsQuery =
        cache.readQuery<GetReviewsForProductSlugQuery>({
          query: GetReviewsForProductSlugDocument,
          variables: { slug: productSlug },
        });

      if (!originalReviewsQuery?.product?.reviews || !result.data?.review) {
        return;
      }

      const newReviewsQuery = {
        ...originalReviewsQuery,
        product: {
          ...originalReviewsQuery.product,
          reviews: [
            result.data?.review,
            ...originalReviewsQuery.product.reviews,
          ],
        },
      };

      cache.writeQuery({
        query: GetReviewsForProductSlugDocument,
        variables: { slug: productSlug },
        data: newReviewsQuery,
      });
    },
  });
  const [publishReview, publishRewievResult] =
    usePublishProductReviewMutation();

  const onSubmit = handleSubmit(async (data) => {
    if (isValid) {
      const res = await createReview({
        variables: {
          review: {
            ...data,
            product: {
              connect: {
                slug: productSlug,
              },
            },
          },
        },
        optimisticResponse: {
          __typename: "Mutation",
          review: {
            __typename: "Review",
            id: (-Math.random()).toString(),
            createdAt: Date.now().toString(),
            ...data,
          },
        },
      });

      await publishReview({
        variables: { id: res.data?.review?.id || "" },
      });
      // if (!publishRewievResult.error) {
      //   newCommentHandle();
      // }

      reset();
    }
  });

  return (
    <div className="my-4">
      <h1 className="text-5xl font-bold pb-4">Create content</h1>

      <form className="space-y-4" onSubmit={onSubmit}>
        <Input
          id="headline"
          register={register}
          errors={errors}
          label="Headline"
        />
        <div className="grid gap-4 md:grid-cols-2">
          <Input id="name" register={register} errors={errors} label="Name" />
          <Input
            id="email"
            register={register}
            errors={errors}
            label="E-mail"
            type={"email"}
          />
        </div>
        <Textarea
          id="content"
          register={register}
          errors={errors}
          label="Comment"
        />
        <Input<ProductReviewFormData>
          register={register}
          label={"Rating"}
          type={"number"}
          errors={errors}
          id="rating"
        ></Input>
        <SubmitButton>Submit</SubmitButton>
      </form>
    </div>
  );
};
