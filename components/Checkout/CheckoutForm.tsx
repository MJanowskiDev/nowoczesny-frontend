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
  cardNumber: yup.string().required(),
  cardExpirationDate: yup.string().required(),
  cardCVC: yup.string().required(),
  country: yup.string().required(),
  postalCode: yup.string().required(),
});

type CheckoutFormData = yup.InferType<typeof checkoutFormSchema>;

export const CheckoutForm = () => {
  const { i18n, t } = useTranslation();
  const formRef = useRef<HTMLFormElement>(null);

  const [showModal, setShowModal] = useState(false);

  const [createOrder, createOrderResult] = useCreateOrderMutationMutation();

  const cartState = useCartState();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<CheckoutFormData>({
    resolver: yupResolver(checkoutFormSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    if (isValid) {
      await createOrder({
        variables: {
          order: {
            email: data.email,
            total: cartState.totalPrice,
            stripeCheckoutId: STRIPE_CHECKOUT_ID,
            orderItems: {
              create: cartState.items.map((item) => ({
                quantity: item.count,
                total: item.price,
                product: {
                  connect: {
                    id: item.id,
                  },
                },
              })),
            },
          },
        },
      });

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

      <form
        ref={formRef}
        onSubmit={onSubmit}
        className="grid grid-cols-6 gap-4"
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
          <legend className="mb-1 block text-sm ">{t("Card details")}</legend>

          <div className="-space-y-px rounded-lg  shadow-sm grid gap-4">
            <Input<CheckoutFormData>
              register={register}
              id="cardNumber"
              type="text"
              placeholder={t("Card number")}
              errors={errors}
            />

            <div className="flex">
              <Input<CheckoutFormData>
                wrappingElementStyle="flex-1 pr-4"
                register={register}
                id="cardExpirationDate"
                type="text"
                placeholder="MM / YY"
                registerOptions={{
                  required: true,
                  validate: validateCardYearMonth,
                }}
                errors={errors}
              />

              <Input<CheckoutFormData>
                wrappingElementStyle="flex-1"
                register={register}
                id="cardCVC"
                type="text"
                placeholder="CVC"
                registerOptions={{
                  required: true,
                  validate: validateCardYearMonth,
                }}
                errors={errors}
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="col-span-6">
          <legend className="mb-1 block text-sm ">
            {t("Billing Address")}
          </legend>

          <div className="-space-y-px rounded-lg bg-white shadow-sm ">
            <Select<CheckoutFormData>
              register={register}
              errors={errors}
              id="country"
            >
              <option>{t("England")}</option>
              <option>{t("Scotland")}</option>
              <option>{t("France")}</option>
              <option>{t("Belgium")}</option>
              <option>{t("Japan")}</option>
            </Select>

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
        </fieldset>

        <div className="col-span-6">
          <SubmitButton>{t("Proceed")}</SubmitButton>
        </div>
      </form>
    </>
  );
};
