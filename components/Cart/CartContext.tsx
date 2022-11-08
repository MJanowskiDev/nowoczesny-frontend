import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";

import {
  CartItem,
  getCartAmount,
  getTotalPrice,
  addItemFn,
  editProductCountFn,
  removeItemFn,
  getCartItemsLocalStorage,
  setCartItemsLocalStorage,
} from "./CartUtils";

export interface CartState {
  readonly items: readonly CartItem[];
  readonly totalCount: number;
  readonly totalPrice: number;
  readonly addItem: (item: CartItem) => void;
  readonly removeItem: (id: CartItem["id"]) => void;
  readonly removeAllItems: () => void;
  readonly editProductCount: (
    id: CartItem["id"],
    newCount: CartItem["count"]
  ) => void;
}

export const CartStateContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const items = getCartItemsLocalStorage();
    setCartItems(items);
    setLoaded(true);
    setTotalCount(getCartAmount(items));
    setTotalPrice(getTotalPrice(items));
  }, []);

  useEffect(() => {
    if (loaded) {
      setCartItemsLocalStorage(cartItems);
      setTotalCount(getCartAmount(cartItems));
      setTotalPrice(getTotalPrice(cartItems));
    }
  }, [cartItems, loaded]);

  const addItem = (item: CartItem) => {
    setCartItems((prevState) => {
      return addItemFn(prevState, item);
    });
  };

  const editProductCount = (
    id: CartItem["id"],
    updatedCount: CartItem["count"]
  ) => {
    setCartItems((prevState) => {
      return editProductCountFn(prevState, id, updatedCount);
    });
  };

  const removeAllItems = () => {
    setCartItems([]);
    setTotalCount(0);
    setTotalPrice(0);
  };

  const removeItem = (id: CartItem["id"]) => {
    setCartItems((prevState) => {
      return removeItemFn(prevState, id);
    });
  };

  return (
    <CartStateContext.Provider
      value={{
        items: cartItems,
        totalCount,
        totalPrice,
        addItem,
        removeItem,
        removeAllItems,
        editProductCount,
      }}
    >
      {children}
    </CartStateContext.Provider>
  );
};

export const CartStateContext = createContext<CartState | null>(null);

export const useCartState = () => {
  const cartState = useContext(CartStateContext);
  if (!cartState) {
    throw new Error("You forgot CartStateContextProvider");
  }
  return cartState;
};
