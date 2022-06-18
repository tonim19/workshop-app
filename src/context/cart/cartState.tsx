import React, { useEffect, useReducer } from "react";
import CartContext from "./cartContext";
import cartReducer from "./cartReducer";

interface Props {
  children: React.ReactNode;
}

export let initialState = JSON.parse(
  localStorage.getItem("cartState") as string
) || {
  hidden: true,
  cartItems: [],
};

const CartContextProvider = (props: Props) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem("cartState", JSON.stringify(state));
  }, [state]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
