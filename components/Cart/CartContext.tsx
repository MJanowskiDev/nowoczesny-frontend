import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";

interface CartItem {
  readonly id: string;
  readonly price: number;
  readonly title: string;
  readonly count?: number;
}

interface CartState {
  readonly items: readonly CartItem[];
  readonly addItem: (item: CartItem) => void;
  readonly removeItem: (id: CartItem["id"]) => void;
  readonly removeAllItems: () => void;
}
export const CartStateContext = createContext<CartState | null>(null);

export const CartStateContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const items = getCartItemsLocalStorage();
    console.log("items once", items);
    setCartItems(items);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      setCartItemsLocalStorage(cartItems);
    }
  }, [cartItems, loaded]);

  const addItem = (item: CartItem) => {
    setCartItems((prevState) => {
      const existingItem = prevState.find(
        (prevItem) => prevItem.id === item.id
      );

      if (!existingItem) {
        return [...prevState, item];
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

  const removeAllItems = () => {
    setCartItems([]);
  };

  const removeItem = (id: CartItem["id"]) => {
    setCartItems((prevState) => {
      const existingItem = prevState.find(
        (existingItem) => existingItem.id === id
      );

      if (existingItem?.count === 1) {
        return prevState.filter((el) => el.id !== id);
      }

      return prevState.map((existingItem) => {
        if (existingItem.id === id) {
          return {
            ...existingItem,
            count: existingItem.count ? existingItem.count - 1 : 0,
          };
        } else {
          return existingItem;
        }
      });
    });
  };

  return (
    <CartStateContext.Provider
      value={{ items: cartItems, addItem, removeItem, removeAllItems }}
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
