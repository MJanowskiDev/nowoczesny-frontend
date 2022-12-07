import { useSession } from "next-auth/react";
import { createContext, ReactNode, useContext, useEffect } from "react";

import { useGetCartItemsQuery } from "../../graphql/generated/gql-types";

import {
  CartItem,
  addItemFn,
  editProductCountFn,
  removeItemFn,
  removeAllCartItems,
  getCartAmount,
  getTotalPrice,
  CartState,
  setUserUUID,
} from "./CartUtils";

export const CartStateContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const session = useSession();
  const userUUID = session.data?.user.id;

  useEffect(() => {
    if (userUUID) {
      setUserUUID(userUUID);
    }
  }, [userUUID]);

  const { data } = useGetCartItemsQuery({
    variables: { id: userUUID! },
  });

  const cartItems =
    data?.cartItems?.map((item) => ({
      id: item.id!,
      price: item.product?.price!,
      title: item.product?.name!,
      count: item.count,
      image: item.product?.images[0].url!,
      slug: item.product?.slug!,
    })) || [];

  const addItem = (item: CartItem) => {
    if (data?.cartItems) {
      const res = data?.cartItems.find((el) =>
        el.product?.id ? el.product.id === item.id : false
      );
      if (res?.id) {
        addItemFn(cartItems, { ...item, id: res.id });
      } else {
        addItemFn(cartItems, item);
      }
    } else {
      addItemFn(cartItems, item);
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
    removeItemFn(id);
  };

  return (
    <CartStateContext.Provider
      value={{
        items: cartItems,
        userUUID: userUUID || "",
        totalCount: getCartAmount(cartItems),
        totalPrice: getTotalPrice(cartItems),
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
