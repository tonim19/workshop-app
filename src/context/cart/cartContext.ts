import { createContext, Dispatch } from "react";
import { Item } from "../../interfaces";

type InitialStateType = {
  hidden: boolean;
  cartItems: Item[];
};

const initialState = {
  hidden: true,
  cartItems: [],
};

const CartContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<any>;
}>({ state: initialState, dispatch: () => null });

export default CartContext;
