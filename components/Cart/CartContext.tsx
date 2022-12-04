import { createContext, ReactNode, useContext, useEffect } from "react";

import { useGetUserCartQuery } from "../../graphql/generated/gql-types";

import {
  CartItem,
  addItemFn,
  editProductCountFn,
  removeItemFn,
  removeAllCartItems,
  getUserUUID,
  createUserData,
  getCartAmount,
  getTotalPrice,
  CartState,
} from "./CartUtils";

export const CartStateContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const userUUID = getUserUUID();

  useEffect(() => {
    const generateUUID = async () => {
      await createUserData();
    };
    if (!userUUID) {
      generateUUID();
    }
  }, [userUUID]);

  const { data } = useGetUserCartQuery({
    variables: { userUUID },
  });

  const cartItems =
    data?.userData?.cartItems.map((item) => ({
      id: item.id || "",
      price: item.product?.price!,
      title: item.product?.name!,
      count: item.count,
      image: item.product?.images[0].url!,
      slug: item.product?.slug!,
    })) || [];

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
        userUUID: userUUID,
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
