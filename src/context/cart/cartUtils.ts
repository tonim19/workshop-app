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
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem;
    });
  }

  return [...cartItems, { ...cartItemToAddAndQuantity.item, quantity: 1 }];
};
