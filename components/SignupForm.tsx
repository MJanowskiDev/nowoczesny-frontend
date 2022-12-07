import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Input } from "./Form/Input";
import { SubmitButton } from "./Form/SubmitButton";

const signupFormSchema = yup
  .object({
    email: yup.string().required().email(),
    password: yup.string().required(),
  })
  .required();

type SignupFormData = yup.InferType<typeof signupFormSchema>;

export const SignupForm = () => {
  const { register, handleSubmit, formState } = useForm<SignupFormData>({
    resolver: yupResolver(signupFormSchema),
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.status === 500 || res.status === 400) {
        setError(true);
        setSuccess(false);
      } else {
        setSuccess(true);
        setError(false);
      }
    } catch (error) {
      setError(true);
      setSuccess(false);
    }
  });

  return (
    <div className="p-10 my-4 max-w-md mx-auto ">
      <form className="flex flex-col gap-8 w-full" onSubmit={onSubmit}>
        <Input<SignupFormData>
          id={"email"}
          register={register}
          label={"E-mail"}
          type={"mail"}
          errors={formState.errors}
        />

        <Input<SignupFormData>
          id={"password"}
          register={register}
          label={"Password"}
          type={"password"}
          errors={formState.errors}
        />

        <SubmitButton>Register</SubmitButton>

        {success && <p className="text-green-500">Registration success!</p>}
        {error && <p className="text-red-500">Registration failed</p>}
      </form>
    </div>
  );
};
