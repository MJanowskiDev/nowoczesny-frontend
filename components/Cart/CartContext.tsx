import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";

export interface CartItem {
  readonly id: string;
  readonly price: number;
  readonly title: string;
  readonly count: number;
  readonly image: string;
}

interface CartState {
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
export const CartStateContext = createContext<CartState | null>(null);

const getCartAmount = (cartItems: CartItem[]) => {
  return cartItems.reduce((accumulator, cartItem) => {
    return accumulator + cartItem.count;
  }, 0);
};

const getTotalPrice = (cartItems: CartItem[]) => {
  return cartItems.reduce((accumulator, cartItem) => {
    console.log(cartItem);
    return accumulator + cartItem.count * cartItem.price;
  }, 0);
};

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
    console.log("items once", items);
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
      const existingItem = prevState.find(
        (prevItem) => prevItem.id === item.id
      );

      if (!existingItem) {
        return [...prevState, (item = { ...item, count: 1 })];
      }

      return prevState.map((existingItem) => {
        if (existingItem.id === item.id) {
          return {
            ...existingItem,
            count: existingItem.count ? existingItem.count + 1 : 1,
          };
        } else {
          return existingItem;
        }
      });
    });
  };

  const editProductCount = (
    id: CartItem["id"],
    newCount: CartItem["count"]
  ) => {
    setCartItems((prevState) => {
      const existingItem = prevState.find((prevItem) => prevItem.id === id);

      if (!existingItem) {
        return [...prevState];
      }

      return prevState.map((existingItem) => {
        if (existingItem.id === id) {
          return {
            ...existingItem,
            count: newCount,
          };
        } else {
          return existingItem;
        }
      });
    });
  };

  const removeAllItems = () => {
    setCartItems([]);
    setTotalCount(0);
    setTotalPrice(0);
  };

  const removeItem = (id: CartItem["id"]) => {
    setCartItems((prevState) => {
      const existingItem = prevState.find(
        (existingItem) => existingItem.id === id
      );

      if (existingItem) {
        return prevState.filter((el) => el.id !== id);
      } else {
        return prevState;
      }
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

export const useCartState = () => {
  const cartState = useContext(CartStateContext);
  if (!cartState) {
    throw new Error("You forgot CartStateContextProvider");
  }
  return cartState;
};

const getCartItemsLocalStorage = () => {
  const localStorageItems = localStorage.getItem("SHOPPING_CART_MJanowskiDev");
  console.log("here", localStorageItems);
  if (!localStorageItems) {
    return [];
  }
  try {
    const items = JSON.parse(localStorageItems);
    return items;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const setCartItemsLocalStorage = (items: CartItem[]) => {
  console.log("Set", items);
  localStorage.setItem("SHOPPING_CART", JSON.stringify(items));
};
