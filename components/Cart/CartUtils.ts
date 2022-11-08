export interface CartItem {
  readonly id: string;
  readonly price: number;
  readonly title: string;
  readonly count: number;
  readonly image: string;
}

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

export const addItemFn = (prevState: CartItem[], item: CartItem) => {
  const existingItem = prevState.find((prevItem) => prevItem.id === item.id);

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
};

export const editProductCountFn = (
  prevState: CartItem[],
  id: CartItem["id"],
  updatedCount: CartItem["count"]
) => {
  const existingItem = prevState.find((prevItem) => prevItem.id === id);

  if (!existingItem) {
    return [...prevState];
  }

  return prevState.map((existingItem) => {
    if (existingItem.id === id) {
      return {
        ...existingItem,
        count: updatedCount,
      };
    } else {
      return existingItem;
    }
  });
};

export const removeItemFn = (prevState: CartItem[], id: CartItem["id"]) => {
  const existingItem = prevState.find((existingItem) => existingItem.id === id);

  if (existingItem) {
    return prevState.filter((el) => el.id !== id);
  } else {
    return prevState;
  }
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
