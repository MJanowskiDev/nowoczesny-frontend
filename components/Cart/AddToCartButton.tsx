import { useUser } from "@clerk/nextjs";
import { useCartState } from "./CartContext";
import { CartItem } from "./CartUtils";
import debounce from "lodash.debounce";

interface AddToCartButtonProps {
  item: CartItem;
}

export const AddToCartButton = ({ item }: AddToCartButtonProps) => {
  const { addItem } = useCartState();

  const { isLoaded, isSignedIn } = useUser();

  const notAuthetnicated = !isLoaded || !isSignedIn;

  if (notAuthetnicated) {
    return null;
  }

  const debouncedCallback = debounce(() => addItem(item), 500);

  const onAddToCartClickHandle = () => {
    debouncedCallback();
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
