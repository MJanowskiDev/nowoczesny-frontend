import Link from "next/link";
import Image from "next/image";
import { useCartState } from "../components/Cart/CartContext";
import { ItemControlElement } from "../components/Cart/ItemControlElement";
import { RemoveIcon } from "../components/UI/Icons";
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
  const { totalCount, totalPrice } = useCartState();
  if (totalCount <= 0) {
    return <ProductCartIsEmpty />;
  }
  return (
    <div>
      <div className="grid grid-cols-3 gap-4 divide-x-2 divide-slate-50">
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
            className="py-4 flex justify-between items-center"
          >
            <div className="flex justify-center items-center gap-2">
              <div className="rounded-lg">
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
                {cartItem.title} <small>x{cartItem.count}</small>
              </div>
            </div>

            <div className="flex gap-2 items-center">
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
  const { removeAllItems, totalCount, totalPrice } = useCartState();
  return (
    <div className="grid justify-items-end content-start text-right">
      <h2 className="heading">Checkout</h2>
      <p>
        Total product quantity: <span className="font-bold">{totalCount}</span>
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
  );
};
export default CartPage;
