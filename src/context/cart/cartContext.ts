import { createContext, Dispatch } from "react";
import { Item } from "../../interfaces";
import { initialState } from "./cartState";

type InitialStateType = {
  hidden: boolean;
  cartItems: Item[];
};

const CartContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<any>;
}>({ state: initialState, dispatch: () => null });

export default CartContext;
