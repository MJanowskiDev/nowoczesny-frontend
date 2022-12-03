import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { useGetUserCartQuery } from "../../graphql/generated/gql-types";

import {
  CartItem,
  getCartAmount,
  getTotalPrice,
  addItemFn,
  editProductCountFn,
  removeItemFn,
  removeAllCartItems,
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
  const [totalCount, setTotalCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const { data, loading, error } = useGetUserCartQuery({
    variables: { userUUID: "123-123-123" },
    fetchPolicy: "network-only",
  });

  let cartItems = [] as CartItem[];

  const cartItemsQuery = data?.userData;
  if (cartItemsQuery?.cartItems.length) {
    cartItems = cartItemsQuery.cartItems.map((item) => ({
      id: item.id || "",
      price: item.product?.price || 0,
      title: item.product?.name || "",
      count: item.count,
      image: item.product?.images[0].url || "",
      slug: item.product?.slug || "",
    }));
  }

  useEffect(() => {
    setTotalCount(getCartAmount(cartItems));
    setTotalPrice(getTotalPrice(cartItems));
  }, [cartItems]);

  const addItem = (item: CartItem) => {
    if (data?.userData?.cartItems) {
      const res = data?.userData?.cartItems.find((el) =>
        el.product?.id ? el.product.id === item.id : false
      );
      if (res?.id) {
        addItemFn(cartItems, { ...item, id: res.id });
      } else {
        addItemFn(cartItems, item);
      }
    }
  };

  const editProductCount = (
    id: CartItem["id"],
    updatedCount: CartItem["count"]
  ) => {
    editProductCountFn(id, updatedCount);
  };

  const removeAllItems = () => {
    removeAllCartItems();
  };

  const removeItem = (id: string) => {
    removeItemFn(cartItems, id);
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
