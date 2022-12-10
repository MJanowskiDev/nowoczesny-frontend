import { useRef, useState } from "react";
import { Input } from "../Form/Input";
import { SubmitButton } from "../Form/SubmitButton";
import { Select } from "../Form/Select";
import { validateCardYearMonth } from "../../utils";
import i18n from "../../i18";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUser } from "@clerk/nextjs";
import { loadStripe } from "@stripe/stripe-js";
import Stripe from "stripe";

yup.setLocale({
  mixed: {
    required: () => i18n.t("yup_required"),
  },
  string: {
    email: () => i18n.t("yup_email"),
  },
});

const checkoutFormSchema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required().email(),
  phone: yup.string(),
  country: yup.string().required(),
  postalCode: yup.string().required(),
  streetAddres: yup.string().required(),
  city: yup.string().required(),
});

export type CheckoutFormData = yup.InferType<typeof checkoutFormSchema>;

export const CheckoutForm = () => {
  const { i18n, t } = useTranslation();
  const formRef = useRef<HTMLFormElement>(null);

  const user = useUser();
  const [payInProgress, setPayInProgress] = useState(false);

  const pay = async (formData: CheckoutFormData) => {
    try {
      setPayInProgress(true);
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
      );

      if (!stripe) {
        setPayInProgress(false);
        throw new Error("Problem with stripe ");
      }

      const res = await fetch("/api/checkout", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData }),
      });

      const { session }: { session: Stripe.Response<Stripe.Checkout.Session> } =
        await res.json();

      await stripe.redirectToCheckout({ sessionId: session.id });
      setPayInProgress(false);
    } catch (error) {
      setPayInProgress(false);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<CheckoutFormData>({
    resolver: yupResolver(checkoutFormSchema),
    defaultValues: {
      firstName: user.user?.firstName || "",
      lastName: user.user?.lastName || "",
      email: user.user?.emailAddresses[0].emailAddress || "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    if (isValid) {
      await pay(data);
      reset();
    }
  });

  return (
    <>
      <h1 className="text-2xl py-4 font-medium">
        {t("Customer informations")}
      </h1>
      <form
        ref={formRef}
        onSubmit={onSubmit}
        className="grid grid-cols-6 gap-2"
      >
        <Input<CheckoutFormData>
          wrappingElementStyle="col-span-3"
          register={register}
          id={"firstName"}
          label={t("First name")}
          errors={errors}
        />

        <Input<CheckoutFormData>
          wrappingElementStyle="col-span-3"
          register={register}
          id={"lastName"}
          label={t("Last name")}
          errors={errors}
        />

        <Input<CheckoutFormData>
          wrappingElementStyle="col-span-6"
          register={register}
          id={"email"}
          label={t("E-Mail")}
          registerOptions={{ required: true }}
          type="email"
          errors={errors}
        />

        <Input<CheckoutFormData>
          wrappingElementStyle="col-span-6"
          register={register}
          id="phone"
          label={t("Phone")}
          type="tel"
          errors={errors}
        />

        <fieldset className="col-span-6">
          <h1 className="text-2xl py-4 font-medium">{t("Shipping details")}</h1>

          <div className="-space-y-px  grid gap-2">
            <Input<CheckoutFormData>
              register={register}
              id="streetAddres"
              type="text"
              label={t("Street Address")}
              errors={errors}
            />

            <div className="flex">
              <Input<CheckoutFormData>
                wrappingElementStyle="flex-1 pr-4"
                register={register}
                id="city"
                type="text"
                label={t("City")}
                registerOptions={{
                  required: true,
                  validate: validateCardYearMonth,
                }}
                errors={errors}
              />

              <Input<CheckoutFormData>
                register={register}
                id="postalCode"
                label={t("ZIP/Post Code")}
                type="text"
                placeholder="XX-XXX"
                errors={errors}
                attributes={{ autoComplete: "postal-code" }}
              />
            </div>
            <Select<CheckoutFormData>
              register={register}
              errors={errors}
              label={t("Country")}
              id="country"
            >
              <option>{t("Poland")}</option>
              <option>{t("England")}</option>
              <option>{t("Scotland")}</option>
              <option>{t("France")}</option>
              <option>{t("Belgium")}</option>
              <option>{t("Japan")}</option>
            </Select>
          </div>
        </fieldset>

        <div className="col-span-6">
          <SubmitButton disabled={payInProgress}>{t("Proceed")}</SubmitButton>
        </div>
      </form>
    </>
  );
};
