import { apolloClient } from "../../graphql/apolloClient";
import {
  AddItemToCartDocument,
  AddItemToCartMutation,
  AddItemToCartMutationVariables,
  ClearCartDocument,
  ClearCartMutation,
  ClearCartMutationVariables,
  GetCartItemsDocument,
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

export interface CartState {
  readonly items: readonly CartItem[];
  readonly totalCount: number;
  readonly totalPrice: number;
  readonly userUUID: string;
  readonly addItem: (item: CartItem) => void;
  readonly removeItem: (id: CartItem["id"]) => void;
  readonly removeAllItems: () => void;
  readonly editProductCount: (
    id: CartItem["id"],
    newCount: CartItem["count"]
  ) => void;
}

let userUUID = "";
export const CART_MAX_QANTITY = 15;
export const CART_MIN_QANTITY = 1;

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
    await apolloClient.mutate<
      AddItemToCartMutation,
      AddItemToCartMutationVariables
    >({
      mutation: AddItemToCartDocument,
      variables: { ...item, userUUID: getUserId() },
      refetchQueries: [
        {
          query: GetCartItemsDocument,
          variables: { id: getUserId() },
        },
      ],
    });
  } else {
    if (existingItem.count < CART_MAX_QANTITY) {
      await editProductCountFn(existingItem.id, existingItem.count + 1);
    }
  }
};

export const editProductCountFn = async (id: string, updatedCount: number) => {
  await apolloClient.mutate<UpdateCartMutation, UpdateCartMutationVariables>({
    mutation: UpdateCartDocument,
    variables: { id, count: updatedCount },
    refetchQueries: [
      {
        query: GetCartItemsDocument,
        variables: { id: getUserId() },
      },
    ],
  });
};

export const removeItemFn = (id: CartItem["id"]) => {
  apolloClient.mutate<RemoveCartItemMutation, RemoveCartItemMutationVariables>({
    mutation: RemoveCartItemDocument,
    variables: { id },
    refetchQueries: [
      {
        query: GetCartItemsDocument,
        variables: { id: getUserId() },
      },
    ],
  });
};

export const removeAllCartItems = async () => {
  await apolloClient.mutate<ClearCartMutation, ClearCartMutationVariables>({
    mutation: ClearCartDocument,
    variables: { userUUID: getUserId() },
    refetchQueries: [
      {
        query: GetCartItemsDocument,
        variables: { id: getUserId() },
      },
    ],
  });
};

export const setUserUUID = (uuid: string) => {
  userUUID = uuid;
};

export const getUserId = (): string => {
  if (!userUUID) {
    throw new Error("NO USER ID!!!!!");
  }
  return userUUID;
};
