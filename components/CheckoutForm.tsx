import { useForm } from "react-hook-form";
import { validateCardYearMonth } from "../utils";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "./Form/Input";
import { SubmitButton } from "./Form/SubmitButton";
import { CheckoutSummary } from "./CheckoutSummary";

const checkoutFormSchema = yup
  .object({
    firstName: yup.string().required().uppercase(),
    lastName: yup.string().required(),
    email: yup.string().required().email(),
    phone: yup.string().required(),
    cardNumber: yup.string().required(),
    cardExpirationDate: yup.string().required(),
    cardCVC: yup.string().required(),
    country: yup.string().required(),
    postalCode: yup.string().required(),
  })
  .required();

type CheckoutFormData = yup.InferType<typeof checkoutFormSchema>;

export const CheckoutForm = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({ resolver: yupResolver(checkoutFormSchema) });

  console.log(errors);

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <div>
      <section>
        <h1 className="sr-only">Checkout</h1>
        <div className="relative mx-auto max-w-screen-2xl ">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <CheckoutSummary />
            <div className="bg-white py-12 md:py-24">
              <div className="mx-auto max-w-lg px-4 lg:px-8">
                <form onSubmit={onSubmit} className="grid grid-cols-6 gap-4">
                  <Input<CheckoutFormData>
                    wrappingElementStyle="col-span-3"
                    register={register}
                    id={"firstName"}
                    label="First name"
                    errors={errors}
                  />

                  <Input<CheckoutFormData>
                    wrappingElementStyle="col-span-3"
                    register={register}
                    id={"lastName"}
                    label="Last name"
                    errors={errors}
                  />

                  <Input<CheckoutFormData>
                    wrappingElementStyle="col-span-6"
                    register={register}
                    id={"email"}
                    label="E-Mail"
                    registerOptions={{ required: true }}
                    type="email"
                    errors={errors}
                  />

                  <Input<CheckoutFormData>
                    wrappingElementStyle="col-span-6"
                    register={register}
                    id="phone"
                    label="Phone"
                    type="tel"
                    errors={errors}
                  />

                  <fieldset className="col-span-6">
                    <legend className="mb-1 block text-sm text-gray-600">
                      Card Details
                    </legend>

                    <div className="-space-y-px rounded-lg bg-white shadow-sm">
                      <Input<CheckoutFormData>
                        register={register}
                        id="cardNumber"
                        type="text"
                        placeholder="Card number"
                        errors={errors}
                      />

                      <div className="flex -space-x-px">
                        <Input<CheckoutFormData>
                          wrappingElementStyle="flex-1"
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
                    <legend className="mb-1 block text-sm text-gray-600">
                      Billing Address
                    </legend>

                    <div className="-space-y-px rounded-lg bg-white shadow-sm">
                      <div>
                        <label className="sr-only" htmlFor="country">
                          Country
                        </label>

                        <select
                          className="relative w-full rounded-t-lg border-gray-200 p-2.5 text-sm focus:z-10"
                          id="country"
                          {...register("country")}
                          autoComplete="country-name"
                        >
                          <option>England</option>
                          <option>Wales</option>
                          <option>Scotland</option>
                          <option>France</option>
                          <option>Belgium</option>
                          <option>Japan</option>
                        </select>
                      </div>

                      <Input<CheckoutFormData>
                        register={register}
                        id="postalCode"
                        type="text"
                        placeholder="ZIP/Post Code"
                        errors={errors}
                        attributes={{ autoComplete: "postal-code" }}
                      />
                    </div>
                  </fieldset>

                  <div className="col-span-6">
                    <SubmitButton>{"Proceed"}</SubmitButton>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
