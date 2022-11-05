import { useCartState } from "../components/Cart/CartContext";

const removeIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-4 h-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
    />
  </svg>
);

const CartPage = () => {
  return (
    <div>
      <h1>Cart</h1>
      <div className="grid grid-cols-3 gap-4">
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
      <ul className="divide-y divide-gray-200 py-2">
        {cartState.items.map((cartItem) => (
          <li
            key={cartItem.id}
            className="py-4 flex justify-between items-center"
          >
            <div>
              {cartItem.title} ({cartItem.count})
            </div>
            <div className="flex gap-2 items-center">
              <div>{cartItem.price}$</div>
              <button
                onClick={() => cartState.removeItem(cartItem.id)}
                className="rounded border border-red-600 px-1 py-1 text-sm font-medium text-red-600 hover:bg-red-600 hover:text-white focus:outline-none focus:ring active:bg-red-500"
              >
                {removeIcon}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const CartSummary = () => {
  const { items, removeAllItems } = useCartState();
  return (
    <div>
      <h2>Podsumowanie koszyka</h2>
      <p>
        Lista elementow: <span className="font-bold">{items.length}</span>
      </p>
      <button
        onClick={removeAllItems}
        className="flex justify-between items-center rounded border border-red-600 px-1 py-1 my-2 text-sm font-medium text-red-600 hover:bg-red-600 hover:text-white focus:outline-none focus:ring active:bg-red-500 "
      >
        Clear cart <span className="pl-2">{removeIcon}</span>
      </button>
    </div>
  );
};
export default CartPage;
