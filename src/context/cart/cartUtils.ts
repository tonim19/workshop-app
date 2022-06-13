import { Item } from "../../interfaces";

interface CartItemToAddAndQuantity {
  item: Item;
  quantity: number;
}

export const addItemToCart = (
  cartItems: Item[],
  cartItemToAddAndQuantity: CartItemToAddAndQuantity
) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToAddAndQuantity.item.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) => {
      return cartItem.id === cartItemToAddAndQuantity.item.id
        ? {
            ...cartItem,
            quantity: cartItemToAddAndQuantity.quantity,
          }
        : cartItem;
    });
  }

  return [
    ...cartItems,
    {
      ...cartItemToAddAndQuantity.item,
      quantity: cartItemToAddAndQuantity.quantity,
    },
  ];
};

export const removeItemFromCart = (
  cartItems: Item[],
  cartItemToRemove: Item
) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
};

export const changeCartItemQuantity = (
  cartItems: Item[],
  cartItemQuantity: CartItemToAddAndQuantity
) => {
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemQuantity.item.id
      ? { ...cartItem, quantity: cartItemQuantity.quantity }
      : cartItem
  );
};
