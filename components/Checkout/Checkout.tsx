import { useTranslation } from "react-i18next";
import { CheckoutForm } from "./CheckoutForm";
import { CheckoutSummary } from "./CheckoutSummary";
import { ChangeLanguage } from "../UI/ChangeLanguage";

export const Checkout = () => {
  const { t } = useTranslation();

  return (
    <div>
      <section>
        <h1 className="sr-only">Checkout</h1>

        <div className="relative mx-auto max-w-screen-2xl ">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <CheckoutSummary />
            <div className="dark:text-white  py-12 md:py-24">
              <div className="mx-auto max-w-lg px-4 lg:px-8">
                <div className="flex justify-end items-center">
                  <p>{t("Form language:")}</p>
                  <div>
                    <ChangeLanguage />
                  </div>
                </div>
                <CheckoutForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
