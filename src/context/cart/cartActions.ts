import { Item } from "../../interfaces";
import { CartActionTypes } from "./cartTypes";

export const addItem = (item: Item, quantity: number) => {
  return {
    type: CartActionTypes.ADD_ITEM,
    payload: { item, quantity },
  };
};
