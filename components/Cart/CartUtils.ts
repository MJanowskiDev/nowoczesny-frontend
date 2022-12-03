import { apolloClient } from "../../graphql/apolloClient";
import {
  AddItemToCartDocument,
  AddItemToCartMutation,
  AddItemToCartMutationVariables,
  ClearCartDocument,
  ClearCartMutation,
  ClearCartMutationVariables,
  GetUserCartDocument,
  RemoveCartItemDocument,
  RemoveCartItemMutation,
  RemoveCartItemMutationVariables,
  UpdateCartDocument,
  UpdateCartMutation,
  UpdateCartMutationVariables,
} from "../../graphql/generated/gql-types";

export interface CartItem {
  readonly id: string;
  readonly price: number;
  readonly title: string;
  readonly count: number;
  readonly image: string;
  readonly slug: string;
}

export const CART_MAX_QANTITY = 15;
export const CART_MIN_QANTITY = 1;

const localStorageKey = "SHOPPING_CART_MJanowskiDev";

export const getCartAmount = (cartItems: CartItem[]) => {
  return cartItems.reduce((accumulator, cartItem) => {
    return accumulator + cartItem.count;
  }, 0);
};

export const getTotalPrice = (cartItems: CartItem[]) => {
  return cartItems.reduce((accumulator, cartItem) => {
    return accumulator + cartItem.count * cartItem.price;
  }, 0);
};

export const addItemFn = async (prevState: CartItem[], item: CartItem) => {
  const existingItem = prevState.find((prevItem) => prevItem.id === item.id);

  if (!existingItem) {
    const res = await apolloClient.mutate<
      AddItemToCartMutation,
      AddItemToCartMutationVariables
    >({
      mutation: AddItemToCartDocument,
      variables: { ...item, userUUID: "123-123-123" },
      refetchQueries: [
        {
          query: GetUserCartDocument,
          variables: { userUUID: "123-123-123" },
        },
      ],
    });
  } else {
    await editProductCountFn(existingItem.id, existingItem.count + 1);
  }
};

export const editProductCountFn = async (id: string, updatedCount: number) => {
  await apolloClient.mutate<UpdateCartMutation, UpdateCartMutationVariables>({
    mutation: UpdateCartDocument,
    variables: { id, count: updatedCount },
    refetchQueries: [
      {
        query: GetUserCartDocument,
        variables: { userUUID: "123-123-123" },
      },
    ],
  });
};

export const removeItemFn = (prevState: CartItem[], id: CartItem["id"]) => {
  const existingItem = prevState.find((existingItem) => existingItem.id === id);

  apolloClient.mutate<RemoveCartItemMutation, RemoveCartItemMutationVariables>({
    mutation: RemoveCartItemDocument,
    variables: { id },
    refetchQueries: [
      {
        query: GetUserCartDocument,
        variables: { userUUID: "123-123-123" },
      },
    ],
  });
};

export const removeAllCartItems = async () => {
  await apolloClient.mutate<ClearCartMutation, ClearCartMutationVariables>({
    mutation: ClearCartDocument,
    variables: { userUUID: "123-123-123" },
    refetchQueries: [
      {
        query: GetUserCartDocument,
        variables: { userUUID: "123-123-123" },
      },
    ],
  });
};

export const getCartItemsLocalStorage = () => {
  const localStorageItems = localStorage.getItem(localStorageKey);
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

export const setCartItemsLocalStorage = (items: CartItem[]) => {
  localStorage.setItem(localStorageKey, JSON.stringify(items));
};
