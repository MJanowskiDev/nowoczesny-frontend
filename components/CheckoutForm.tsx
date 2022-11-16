import { useForm } from "react-hook-form";
import { validateCardYearMonth } from "../utils";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Image from "next/image";

const checkoutFormSchema = yup
  .object({
    firstName: yup.string().required(),
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
            <div className="bg-gray-100/50 dark:bg-gray-900 dark:text-white py-12 md:py-24">
              <div className="mx-auto max-w-lg px-4 lg:px-8">
                <div className="flex items-center">
                  <span className="h-10 w-10 rounded-full bg-blue-900"></span>

                  <h2 className="ml-4 font-medium">BambooYou</h2>
                </div>

                <div className="mt-8">
                  <p className="text-2xl font-medium tracking-tight">$99.99</p>
                  <p className="mt-1 text-sm text-gray-500">
                    For the purchase of
                  </p>
                </div>

                <div className="mt-12">
                  <div className="flow-root">
                    <ul className="-my-4 divide-y divide-gray-200">
                      <li className="flex items-center justify-between py-4">
                        <div className="flex items-start">
                          <Image
                            layout="responsive"
                            width={16}
                            height={9}
                            objectFit="contain"
                            alt="Trainer"
                            src="https://images.unsplash.com/photo-1565299999261-28ba859019bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                            className="h-16 w-16 flex-shrink-0 rounded-lg object-cover"
                          />

                          <div className="ml-4">
                            <p className="text-sm">Vibrant Trainers</p>

                            <dl className="mt-1 space-y-1 text-xs text-gray-500">
                              <div>
                                <dt className="inline">Color:</dt>
                                <dd className="inline">Blue</dd>
                              </div>

                              <div>
                                <dt className="inline">Size:</dt>
                                <dd className="inline">UK 10</dd>
                              </div>
                            </dl>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm">
                            $49.99
                            <small className="text-gray-500">x1</small>
                          </p>
                        </div>
                      </li>

                      <li className="flex items-center justify-between py-4">
                        <div className="flex items-start">
                          <Image
                            layout="responsive"
                            width={16}
                            height={9}
                            objectFit="contain"
                            alt="Lettuce"
                            src="https://images.unsplash.com/photo-1640958904159-51ae08bd3412?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80"
                            className="h-16 w-16 flex-shrink-0 rounded-lg object-cover"
                          />

                          <div className="ml-4">
                            <p className="text-sm">Lettuce</p>

                            <dl className="mt-1 space-y-1 text-xs text-gray-500">
                              <div>
                                <dt className="inline">Size:</dt>
                                <dd className="inline">Big</dd>
                              </div>
                            </dl>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm">
                            $25
                            <small className="text-gray-500">x2</small>
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white py-12 md:py-24">
              <div className="mx-auto max-w-lg px-4 lg:px-8">
                <form onSubmit={onSubmit} className="grid grid-cols-6 gap-4">
                  <div className="col-span-3">
                    <label
                      className="mb-1 block text-sm text-gray-600"
                      htmlFor="first_name"
                    >
                      First Name
                    </label>

                    <input
                      className="w-full rounded-lg border-gray-200 p-2.5 text-sm shadow-sm"
                      type="text"
                      id="first_name"
                      {...register("firstName", {
                        required: "This field is required",
                      })}
                    />

                    <p className="text-red-400 text-sm">
                      {errors.firstName?.message}
                    </p>
                  </div>

                  <div className="col-span-3">
                    <label
                      className="mb-1 block text-sm text-gray-600"
                      htmlFor="last_name"
                    >
                      Last Name
                    </label>

                    <input
                      className="w-full rounded-lg border-gray-200 p-2.5 text-sm shadow-sm"
                      type="text"
                      id="last_name"
                      {...register("lastName", { required: true })}
                    />
                  </div>

                  <div className="col-span-6">
                    <label
                      className="mb-1 block text-sm text-gray-600"
                      htmlFor="email"
                    >
                      Email
                    </label>

                    <input
                      className="w-full rounded-lg border-gray-200 p-2.5 text-sm shadow-sm"
                      type="email"
                      id="email"
                      {...(register("email"), { required: true })}
                    />
                  </div>

                  <div className="col-span-6">
                    <label
                      className="mb-1 block text-sm text-gray-600"
                      htmlFor="phone"
                    >
                      Phone
                    </label>

                    <input
                      className="w-full rounded-lg border-gray-200 p-2.5 text-sm shadow-sm"
                      type="tel"
                      id="phone"
                      {...register("phone")}
                    />
                  </div>

                  <fieldset className="col-span-6">
                    <legend className="mb-1 block text-sm text-gray-600">
                      Card Details
                    </legend>

                    <div className="-space-y-px rounded-lg bg-white shadow-sm">
                      <div>
                        <label className="sr-only" htmlFor="card-number">
                          Card Number
                        </label>

                        <input
                          className="relative w-full rounded-t-lg border-gray-200 p-2.5 text-sm placeholder-gray-400 focus:z-10"
                          type="text"
                          id="card-number"
                          placeholder="Card number"
                          {...register("cardNumber")}
                        />
                      </div>

                      <div className="flex -space-x-px">
                        <div className="flex-1">
                          <label
                            className="sr-only"
                            htmlFor="card-expiration-date"
                          >
                            Expiration Date
                          </label>

                          <input
                            className="relative w-full rounded-bl-lg border-gray-200 p-2.5 text-sm placeholder-gray-400 focus:z-10"
                            type="text"
                            id="card-expiration-date"
                            placeholder="MM / YY"
                            {...register("cardExpirationDate", {
                              required: true,
                              validate: validateCardYearMonth,
                            })}
                          />
                          <p>{errors.cardExpirationDate?.message}</p>
                        </div>

                        <div className="flex-1">
                          <label className="sr-only" htmlFor="card-cvc">
                            CVC
                          </label>

                          <input
                            className="relative w-full rounded-br-lg border-gray-200 p-2.5 text-sm placeholder-gray-400 focus:z-10"
                            type="text"
                            id="card-cvc"
                            placeholder="CVC"
                            {...register("cardCVC")}
                          />
                        </div>
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

                      <div>
                        <label className="sr-only" htmlFor="postal-code">
                          ZIP/Post Code
                        </label>

                        <input
                          className="relative w-full rounded-b-lg border-gray-200 p-2.5 text-sm placeholder-gray-400 focus:z-10"
                          type="text"
                          id="postal-code"
                          autoComplete="postal-code"
                          placeholder="ZIP/Post Code"
                          {...register("postalCode")}
                        />
                      </div>
                    </div>
                  </fieldset>

                  <div className="col-span-6">
                    <button
                      className="block w-full rounded-lg bg-black p-2.5 text-sm text-white"
                      type="submit"
                    >
                      Pay Now
                    </button>
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
