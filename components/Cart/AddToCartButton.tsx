import { useSession } from "next-auth/react";
import { useCartState } from "./CartContext";
import { CartItem } from "./CartUtils";

interface AddToCartButtonProps {
  item: CartItem;
}

export const AddToCartButton = ({ item }: AddToCartButtonProps) => {
  const { addItem } = useCartState();

  const { status } = useSession();

  const notAuthetnicated = status !== "authenticated";

  if (notAuthetnicated) {
    return null;
  }

  const onAddToCartClickHandle = () => {
    addItem(item);
  };

  return (
    <button
      onClick={onAddToCartClickHandle}
      className="mt-4 mb-4 w-full inline-block rounded border border-teal-600 px-12 py-3 text-sm font-medium text-teal-600 hover:bg-teal-600 hover:text-white focus:outline-none focus:ring active:bg-teal-500"
    >
      Add to Cart
    </button>
  );
};
