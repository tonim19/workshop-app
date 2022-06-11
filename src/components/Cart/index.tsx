import { useContext } from "react";
import { ReactComponent as CartIcon } from "../../assets/images/svg/cart-icon.svg";
import { ReactComponent as CloseButton } from "../../assets/images/svg/close-button.svg";
import { toggleCartHidden } from "../../context/cart/cartActions";
import CartContext from "../../context/cart/cartContext";
import "./cart.css";

function Cart() {
  const { state, dispatch } = useContext(CartContext);
  if (!state.hidden) {
    return (
      <div className="cartActive">
        <div className="cartHeader">
          <div>
            <CartIcon className="cartIcon" />
            <h5>
              {state.cartItems.length === 1
                ? "1 Workshop"
                : `${state.cartItems.length} Workshops`}
            </h5>
          </div>
          <CloseButton
            className="closeButton"
            onClick={() => dispatch(toggleCartHidden())}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      <CartIcon
        className="cartIcon"
        onClick={() => dispatch(toggleCartHidden())}
      />
      <span className="cartText">
        {state.cartItems.length === 0
          ? "Cart is empty"
          : state.cartItems.length === 1
          ? "1 Workshop in Cart"
          : `${state.cartItems.length} Workshops in Cart`}
      </span>
      <div className="cartItem"></div>
    </div>
  );
}

export default Cart;
