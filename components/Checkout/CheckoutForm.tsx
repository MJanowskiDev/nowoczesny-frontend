import { useRef, useEffect, useState } from "react";

import { Input } from "../Form/Input";
import { SubmitButton } from "../Form/SubmitButton";
import { Select } from "../Form/Select";
import { validateCardYearMonth } from "../../utils";
import Modal from "../UI/Modal";

import i18n from "../../i18";
import { useTranslation } from "react-i18next";

import { useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<CheckoutFormData>({
    resolver: yupResolver(checkoutFormSchema),
  });

  const onSubmit = handleSubmit((data) => {
    if (isValid) {
      setShowModal(true);
      reset();
    }
    console.log(data, errors);
  });

  useEffect(() => {
    if (formRef.current && !isValid && isDirty) {
      formRef.current.requestSubmit();
    }
  }, [i18n.language, isValid, isDirty]);

  return (
    <>
      <Modal
        showModal={showModal}
        closeModal={() => setShowModal(false)}
        title={t("Success")}
        content={t("Form submission succeeded!")}
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

          <div className="-space-y-px rounded-lg bg-white shadow-sm">
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
