import { CartState } from "../../interfaces";
import { CartActionTypes } from "./cartTypes";
import {
  addItemToCart,
  changeCartItemQuantity,
  removeItemFromCart,
} from "./cartUtils";

const cartReducer = (state: CartState, action: any) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: action.payload,
      };
    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload),
      };
    case CartActionTypes.REMOVE_ITEM:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, action.payload),
      };
    case CartActionTypes.CLEAR_ITEMS:
      return {
        ...state,
        cartItems: [],
      };
    case CartActionTypes.CHANGE_ITEM_QUANTITY:
      return {
        ...state,
        cartItems: changeCartItemQuantity(state.cartItems, action.payload),
      };
    default:
      return state;
  }
};

export default cartReducer;
