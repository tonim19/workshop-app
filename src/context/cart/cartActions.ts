import { Item } from "../../interfaces";
import { CartActionTypes } from "./cartTypes";

export const toggleCartHidden = (state: boolean) => {
  return {
    type: CartActionTypes.TOGGLE_CART_HIDDEN,
    payload: state,
  };
};

export const addItem = (item: Item, quantity: number) => {
  return {
    type: CartActionTypes.ADD_ITEM,
    payload: { item, quantity },
  };
};

export const removeItem = (item: Item) => {
  return {
    type: CartActionTypes.REMOVE_ITEM,
    payload: item,
  };
};

export const clearItems = () => {
  return {
    type: CartActionTypes.CLEAR_ITEMS,
  };
};

export const changeItemQuantity = (item: Item, quantity: number) => {
  return {
    type: CartActionTypes.CHANGE_ITEM_QUANTITY,
    payload: { item, quantity },
  };
};
