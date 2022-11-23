import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as yup from "yup";

import { Input } from "./Form/Input";
import { SubmitButton } from "./Form/SubmitButton";
import { LoadingSpinner } from "./UI/Icons";

import { Modal } from "./UI/Modal";

const useAddToNewsletterMutation = () => {
  return useMutation(
    "add-to-newsletter",
    async ({ email }: { email: string }) => {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    }
  );
};
const newsletterFormSchema = yup
  .object({
    email: yup.string().required().email(),
  })
  .required();

type NewsletterFormData = yup.InferType<typeof newsletterFormSchema>;

export const NewsletterForm = () => {
  const {
    register,
    handleSubmit,
    formState,
    reset: resetForm,
  } = useForm<NewsletterFormData>({
    resolver: yupResolver(newsletterFormSchema),
  });

  const { mutate, isLoading, isSuccess, isError, reset } =
    useAddToNewsletterMutation();

  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  const handleModalClose = () => {
    reset();
    resetForm();
  };

  return (
    <>
      <Modal
        showModal={isSuccess || isError}
        closeModal={handleModalClose}
        title={isSuccess ? "Success" : "Error"}
        content={
          <div>
            <p>Newsletter sign up {isSuccess ? "succeed" : "error"}</p>
          </div>
        }
      />

      <form onSubmit={onSubmit}>
        <div className="flex ">
          <div className="relative w-full">
            <Input
              id="email"
              register={register}
              errors={formState.errors}
              placeholder="Enter Your e-mail"
            />
          </div>

          <SubmitButton className="flex gap-2 h-10 rounded-lg dark:bg-teal-600 bg-teal-300 dark:text-white text-md mx-1 p-2 px-6 ">
            <span>Subscribe</span>
            {isLoading && <LoadingSpinner />}
          </SubmitButton>
        </div>
      </form>
    </>
  );
};
