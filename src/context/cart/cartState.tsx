import React, { useReducer } from "react";
import CartContext from "./cartContext";
import cartReducer from "./cartReducer";

interface Props {
  children: React.ReactNode;
}

const CartContextProvider = (props: Props) => {
  const initialState = {
    hidden: true,
    cartItems: [],
  };

  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
