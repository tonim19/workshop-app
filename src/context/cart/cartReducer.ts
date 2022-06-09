import { CartActionTypes } from "./cartTypes";
import { addItemToCart } from "./cartUtils";

const cartReducer = (state: any, action: any) => {
  switch (action.type) {
    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload),
      };
    default:
      return state;
  }
};

export default cartReducer;
