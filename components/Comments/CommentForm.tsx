import { Input } from "../Form/Input";
import { Textarea } from "../Form/Textarea";
import { SubmitButton } from "../Form/SubmitButton";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import {
  useCreateProductReviewMutation,
  usePublishProductReviewMutation,
} from "../../graphql/generated/gql-types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Modal } from "../UI/Modal";
import { Select } from "../Form/Select";

const commentFormSchema = yup.object({
  headline: yup.string().required(),
  name: yup.string().required(),
  email: yup.string().required().email(),
  comment: yup.string().required(),
  rating: yup.number().required(),
});

type CommentFormData = yup.InferType<typeof commentFormSchema>;

interface CommentFormProps {
  productId: string;
}

export const CommentForm = ({ productId }: CommentFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<CommentFormData>({
    resolver: yupResolver(commentFormSchema),
  });

  const [showModal, setShowModal] = useState(false);

  const [createReview, createReviewResult] = useCreateProductReviewMutation();
  const [publishReview, publishRewievResult] =
    usePublishProductReviewMutation();

  const onSubmit = handleSubmit(async (data) => {
    if (isValid) {
      const res = await createReview({
        variables: {
          review: {
            headline: data.headline,
            name: data.name,
            email: data.email,
            content: data.comment,
            rating: data.rating,
            product: {
              connect: {
                id: productId,
              },
            },
          },
        },
      });

      await publishReview({
        variables: { id: res.data?.createReview?.id || "" },
      });

      setShowModal(true);
      reset();
    }
  });

  return (
    <div className="my-4">
      <h1 className="text-5xl font-bold pb-4">Create comment</h1>
      <Modal
        showModal={showModal}
        closeModal={() => setShowModal(false)}
        title="Success"
        content={
          <div>
            <h1>Form submission succeeded!</h1>
            <pre>{JSON.stringify(createReviewResult.data, null, 2)}</pre>
            <pre>{JSON.stringify(publishRewievResult.data, null, 2)}</pre>
          </div>
        }
      />
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
          id="comment"
          register={register}
          errors={errors}
          label="Comment"
        />
        <Select<CommentFormData>
          register={register}
          errors={errors}
          id="rating"
        >
          <option>{1}</option>
          <option>{2}</option>
          <option>{3}</option>
          <option>{4}</option>
          <option>{5}</option>
        </Select>
        <SubmitButton>Submit</SubmitButton>
      </form>
    </div>
  );
};
