import { useEffect, useState, useRef } from "react";
import { RemoveIcon } from "../UI/Icons";
import { useCartState } from "./CartContext";
import { CartItem } from "./CartUtils";

const CART_MAX_QANTITY = 15;
const CART_MIN_QANTITY = 1;

export const ItemControlElement = (cartItem: CartItem) => {
  const { removeItem, editProductCount } = useCartState();
  const [amount, setAmount] = useState(cartItem.count);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setAmount(cartItem.count);
    if (inputRef.current) {
      inputRef.current.value = cartItem.count.toString();
    }
  }, [cartItem.count]);

  useEffect(() => {
    if (amount !== cartItem.count) {
      editProductCount(cartItem.id, amount);
    }
  }, [amount, cartItem, editProductCount]);

  const handleRemoveProductGroup = () => {
    removeItem(cartItem.id);
  };

  const handleAddOne = () => {
    setAmount((prev) => {
      if (prev < CART_MAX_QANTITY) {
        return prev + 1;
      } else {
        return prev;
      }
    });
  };

  const handleSubtractOne = () => {
    setAmount((prev) => {
      if (prev > CART_MIN_QANTITY) {
        return prev - 1;
      } else {
        return prev;
      }
    });
  };

  const setAmountValue = () => {
    const val = Number(inputRef.current?.value);

    if (val < CART_MAX_QANTITY && val > CART_MIN_QANTITY) {
      setAmount(val);
    } else {
      setAmount(CART_MIN_QANTITY);
      if (inputRef.current) {
        inputRef.current.value = CART_MIN_QANTITY.toString();
      }
    }
  };

  const handleSetAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      setAmountValue();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      inputRef.current?.blur();
      setAmountValue();
    }
  };

  return (
    <div className="flex">
      <button className="action-button" onClick={handleSubtractOne}>
        -
      </button>
      <input
        ref={inputRef}
        className="w-4 dark:bg-gray-900 text-center h-7 border-none"
        onBlur={handleSetAmount}
        onKeyDown={handleKeyDown}
      ></input>
      <button className="action-button" onClick={handleAddOne}>
        +
      </button>
      <button
        onClick={handleRemoveProductGroup}
        className="action-button  border-red-600 text-red-600 hover:bg-red-600 hover:text-white focus:outline-none focus:ring active:bg-red-500"
      >
        <RemoveIcon />
      </button>
    </div>
  );
};
