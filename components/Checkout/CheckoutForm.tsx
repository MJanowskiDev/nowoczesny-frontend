import { useRef, useState } from "react";

import { Input } from "../Form/Input";
import { SubmitButton } from "../Form/SubmitButton";
import { Select } from "../Form/Select";
import { validateCardYearMonth } from "../../utils";
import { Modal } from "../UI/Modal";

import i18n from "../../i18";
import { useTranslation } from "react-i18next";

import { useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateOrderMutationMutation } from "../../graphql/generated/gql-types";
import { useCartState } from "../Cart/CartContext";
import { useUser } from "@clerk/nextjs";

const STRIPE_CHECKOUT_ID = "!!stripe-checkout-id!!";

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
  phone: yup.string().required(),
  country: yup.string().required(),
  postalCode: yup.string().required(),
  streetAddres: yup.string().required(),
  city: yup.string().required(),
});

type CheckoutFormData = yup.InferType<typeof checkoutFormSchema>;

export const CheckoutForm = () => {
  const { i18n, t } = useTranslation();
  const formRef = useRef<HTMLFormElement>(null);

  const [showModal, setShowModal] = useState(false);

  const [createOrder, createOrderResult] = useCreateOrderMutationMutation();

  const cartState = useCartState();

  const user = useUser();
  console.log(user);

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
      // await createOrder({
      //   variables: {
      //     order: {
      //       email: data.email,
      //       total: cartState.totalPrice,
      //       stripeCheckoutId: STRIPE_CHECKOUT_ID,
      //       orderItems: {
      //         create: cartState.items.map((item) => ({
      //           quantity: item.count,
      //           total: item.price,
      //           product: {
      //             connect: {
      //               id: item.id,
      //             },
      //           },
      //         })),
      //       },
      //     },
      //   },
      // });

      setShowModal(true);
      reset();
    }
  });

  return (
    <>
      <Modal
        showModal={showModal}
        closeModal={() => setShowModal(false)}
        title={t("Success")}
        content={
          <div>
            <h1>{t("Form submission succeeded!")}</h1>
            <pre>{JSON.stringify(createOrderResult.data, null, 2)}</pre>
          </div>
        }
      />
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
          <SubmitButton>{t("Proceed")}</SubmitButton>
        </div>
      </form>
    </>
  );
};
