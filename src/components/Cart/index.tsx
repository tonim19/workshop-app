import { ReactComponent as CartIcon } from "../../assets/images/svg/cart-icon.svg";
import "./cart.css";

function Cart() {
  return (
    <div className="cart">
      <CartIcon className="cartIcon" />
      <h6 className="cartText">Cart is empty</h6>
    </div>
  );
}

export default Cart;
