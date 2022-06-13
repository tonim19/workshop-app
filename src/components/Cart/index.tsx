import { ChangeEvent, useContext } from "react";
import { ReactComponent as CartIcon } from "../../assets/images/svg/cart-icon.svg";
import { ReactComponent as CloseButton } from "../../assets/images/svg/close-button.svg";
import { ReactComponent as TrashIcon } from "../../assets/images/svg/trash-icon.svg";
import {
  changeItemQuantity,
  removeItem,
  toggleCartHidden,
} from "../../context/cart/cartActions";
import CartContext from "../../context/cart/cartContext";
import { numberWithCommas } from "../../helpers/util-functions";
import { Item } from "../../interfaces";
import "./cart.css";

function Cart() {
  const { state, dispatch } = useContext(CartContext);

  if (!state.hidden) {
    document.body.setAttribute("class", "noScroll");
  } else {
    document.body.removeAttribute("class");
  }

  const onChangeQuantity = (
    e: ChangeEvent<HTMLSelectElement>,
    cartItem: Item
  ) => dispatch(changeItemQuantity(cartItem, parseInt(e.target.value)));

  const getSubtotal = () => {
    return state.cartItems.reduce((prev, curr) => {
      return prev + curr.price * curr.quantity;
    }, 0);
  };

  if (!state.hidden) {
    return (
      <div className="cartActive">
        <div className="cartContainer">
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
          <div className="cartItems">
            {state.cartItems.map((cartItem) => (
              <div key={cartItem.id} className="cartItem">
                <img
                  className="cartItemImage"
                  src={cartItem.imageUrl}
                  alt="cartItem cover"
                />
                <div className="cartItemDetails">
                  <div className="cartItemTitleAndRemoveBtn">
                    <p className="cartItemTitle">{cartItem.title}</p>
                    <div className="cartItemRemoveBtn">
                      <TrashIcon
                        onClick={() => dispatch(removeItem(cartItem))}
                      />
                    </div>
                  </div>
                  <div className="cartItemQuantityAndPrice">
                    <div className="cartItemQuantity">
                      <select
                        value={cartItem.quantity}
                        onChange={(e) => onChangeQuantity(e, cartItem)}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                      </select>
                    </div>
                    <div className="cartItemPrice">
                      {numberWithCommas(cartItem.price)}{" "}
                      <span className="currency">EUR</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="cartItemsSubtotalDiv">
            <p className="cartItemsSubtotalTitle">SUBTOTAL</p>
            <p className="cartItemsSubtotalPrice">
              {numberWithCommas(getSubtotal())}{" "}
              <span className="currency">EUR</span>
            </p>
          </div>
          <button className="checkoutBtn" type="button">
            Checkout
          </button>
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
    </div>
  );
}

export default Cart;
