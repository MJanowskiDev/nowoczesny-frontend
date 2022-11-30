import Image from "next/image";
import { useEffect } from "react";
import successImage from "../../assets/images/success.svg";
import { useCartState } from "../../components/Cart/CartContext";

const SuccessPage = () => {
  const { removeAllItems, items } = useCartState();

  useEffect(() => {
    if (items.length) {
      removeAllItems();
    }
  }, [removeAllItems, items]);

  return (
    <div>
      <main className="w-full md:h-[calc(100vh_-_168px)] h-auto mt-10  md:mt-0 flex justify-center">
        <article className=" h-full w-full prose dark:prose-invert flex flex-col justify-center">
          <h1>Payment Succeeded </h1>
          <div className="max-w-4xl">
            <Image
              src={successImage}
              alt={"MJanowskiDev ecommerce shop - about"}
              layout="responsive"
              width={16}
              height={9}
              objectFit="contain"
            />
          </div>
          <h2 className="text-right">
            <span className="text-teal-600 dark:text-teal-300 ">
              Thank you for shopping!
            </span>
          </h2>
        </article>
      </main>
    </div>
  );
};

export default SuccessPage;
