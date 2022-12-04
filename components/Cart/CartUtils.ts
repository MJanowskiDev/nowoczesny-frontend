import { apolloClient } from "../../graphql/apolloClient";
import { v4 as uuidv4 } from "uuid";
import {
  AddItemToCartDocument,
  AddItemToCartMutation,
  AddItemToCartMutationVariables,
  ClearCartDocument,
  ClearCartMutation,
  ClearCartMutationVariables,
  CreateUserDataDocument,
  CreateUserDataMutation,
  CreateUserDataMutationVariables,
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

const localStorageKey = "MJanowskiDev_STORE_USER_UUID";
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
      variables: { ...item, userUUID: getUserUUID() },
      refetchQueries: [
        {
          query: GetUserCartDocument,
          variables: { userUUID: getUserUUID() },
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
        query: GetUserCartDocument,
        variables: { userUUID: getUserUUID() },
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
        query: GetUserCartDocument,
        variables: { userUUID: getUserUUID() },
      },
    ],
  });
};

export const removeAllCartItems = async () => {
  await apolloClient.mutate<ClearCartMutation, ClearCartMutationVariables>({
    mutation: ClearCartDocument,
    variables: { userUUID: getUserUUID() },
    refetchQueries: [
      {
        query: GetUserCartDocument,
        variables: { userUUID: getUserUUID() },
      },
    ],
  });
};

export const getUserUUID = (): string => {
  if (typeof window === "undefined") {
    return "";
  }
  const localStorageUserUUID = localStorage.getItem(localStorageKey);

  if (!localStorageUserUUID) {
    return "";
  } else {
    try {
      const { userUUID } = JSON.parse(localStorageUserUUID);
      return userUUID;
    } catch (error) {
      throw Error("Error while parsing local storage");
    }
  }
};

export const createUserData = async (): Promise<string> => {
  const userUUID = uuidv4();

  const res = await apolloClient.mutate<
    CreateUserDataMutation,
    CreateUserDataMutationVariables
  >({
    mutation: CreateUserDataDocument,
    variables: { userUUID },
  });
  const createdUserUUID = res.data?.createUserData?.userUUID;
  if (createdUserUUID) {
    localStorage.setItem(
      localStorageKey,
      JSON.stringify({ userUUID: createdUserUUID })
    );
    return createdUserUUID;
  } else {
    throw new Error("Wrong userUUID response value");
  }
};
