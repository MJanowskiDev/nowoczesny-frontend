import Link from "next/link";
import Image from "next/image";
import { useCartState } from "../components/Cart/CartContext";
import { ItemControlElement } from "../components/Cart/ItemControlElement";
import { RemoveIcon } from "../components/UI/Icons";

import Stripe from "stripe";
import { loadStripe } from "@stripe/stripe-js";

const ProductCartIsEmpty = () => (
  <div className="flex justify-center">
    <div>
      <p>Your cart is empty!</p>
      <Link className="" href="/products-ssg/1">
        <button className="btn-primary">Go back to product list</button>
      </Link>
    </div>
  </div>
);

const CartPage = () => {
  const { totalCount, totalPrice, items } = useCartState();
  if (items.length <= 0) {
    return <ProductCartIsEmpty />;
  }
  return (
    <div>
      <div className=" gap-4 divide-x-2 divide-slate-50  grid grid-cols-1 md:grid-cols-3">
        <CartContent />
        <CartSummary />
      </div>
    </div>
  );
};

const CartContent = () => {
  const cartState = useCartState();

  return (
    <div className="col-span-2">
      <h1 className="heading">Cart items</h1>
      <ul className="divide-y divide-gray-200 py-2">
        {cartState.items.map((cartItem) => (
          <li
            key={cartItem.id}
            className="py-4 flex flex-col md:flex-row items-start md:items-center text-sm  md:text-lg"
          >
            <div className="flex  justify-center items-center gap-2">
              <div className="rounded-lg ">
                <Image
                  src={cartItem.image}
                  alt={cartItem.title}
                  width={60}
                  height={60}
                  objectFit="contain"
                  layout="fixed"
                />
              </div>
              <div>
                {cartItem.title}{" "}
                <small className="text-teal-600 dark:text-teal-300">
                  x{cartItem.count}
                </small>
              </div>
            </div>

            <div className="flex gap-2 items-center md:justify-end justify-between w-full">
              <div>{cartItem.price}$ each,</div>
              <div>total: {cartItem.price * cartItem.count}$</div>
              <ItemControlElement {...cartItem} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const CartSummary = () => {
  const { removeAllItems, totalCount, totalPrice, items } = useCartState();

  const pay = async () => {
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
    );

    if (!stripe) {
      throw new Error("Problem with stripe ");
    }

    const res = await fetch("/api/checkout", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        items.map((cartItem) => {
          return {
            slug: cartItem.slug,
            count: cartItem.count,
          };
        })
      ),
    });
    const { session }: { session: Stripe.Response<Stripe.Checkout.Session> } =
      await res.json();

    await stripe.redirectToCheckout({ sessionId: session.id });
  };

  return (
    <div className="flex h-full flex-col justify-between items-end">
      <div className="grid justify-items-end content-start text-right">
        <h2 className="heading">Checkout</h2>
        <p>
          Total product quantity:{" "}
          <span className="font-bold">{totalCount}</span>
        </p>
        <p>
          Total cost: <span className="font-bold">{totalPrice}$</span>
        </p>
        <button
          onClick={removeAllItems}
          className="flex justify-between items-center w-32 rounded border border-red-600 px-1 py-1 my-2 text-sm font-medium text-red-600 hover:bg-red-600 hover:text-white focus:outline-none focus:ring active:bg-red-500 "
        >
          Clear cart{" "}
          <span className="pl-2">
            <RemoveIcon />
          </span>
        </button>
      </div>

      <div className="flex gap-2">
        <Link href="/checkout">
          <a className="border border-teal-600 rounded-md px-4 py-2 hover:bg-teal-300/30">
            Checkout
          </a>
        </Link>

        <button
          onClick={pay}
          className="border border-teal-600 rounded-md px-4 py-2 hover:bg-teal-300/30"
        >
          Checkout with Stripe
        </button>
      </div>
    </div>
  );
};
export default CartPage;
