import Image from "next/image";
import { useCartState } from "../Cart/CartContext";

export const CheckoutSummary = () => {
  const { totalPrice, items } = useCartState();
  return (
    <div className="bg-gray-100/50 dark:bg-gray-900 dark:text-white py-12 md:py-24">
      <div className="mx-auto max-w-lg px-4 lg:px-8">
        <div className="mt-8">
          <p className="text-2xl font-medium tracking-tight">
            PLN {totalPrice / 100}
          </p>
          <p className="mt-1 text-sm text-gray-500">For the purchase of</p>
        </div>

        <div className="mt-12">
          <div className="flow-root">
            <ul className="-my-4 divide-y divide-gray-200">
              {items.map((item) => (
                <li
                  key={`li-checkout-item-${item.id}`}
                  className="flex items-center justify-between py-4"
                >
                  <div className="flex items-start">
                    <div className="rounded-lg bg-white/20 p-1 ">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={60}
                        height={60}
                        objectFit="contain"
                        layout="fixed"
                      />
                    </div>

                    <div className="ml-4">
                      <p className="text-sm">{item.title}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm">
                      PLN {item.price / 100}
                      <small className="text-gray-500">x{item.count}</small>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
