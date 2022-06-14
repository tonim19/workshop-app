import { ChangeEvent, useContext, useState } from "react";
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
import Modal from "../Modal";
import "./cart.css";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  gender: string;
  address: string;
  zipCode: string;
  agree: "false" | "true";
}

function Cart() {
  const { state, dispatch } = useContext(CartContext);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
    gender: "",
    address: "",
    zipCode: "",
    agree: "false",
  });

  const {
    firstName,
    lastName,
    email,
    birthDate,
    gender,
    address,
    zipCode,
    agree,
  } = formData;

  if (!state.hidden) {
    document.body.setAttribute("class", "noScroll");
  } else {
    document.body.removeAttribute("class");
  }

  const onChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onBoolChange = (e: any) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value === "true" ? "false" : "true",
      };
    });
  };

  const onChangeQuantity = (
    e: ChangeEvent<HTMLSelectElement>,
    cartItem: Item
  ) => dispatch(changeItemQuantity(cartItem, parseInt(e.target.value)));

  const getSubtotal = () => {
    return state.cartItems.reduce((prev, curr) => {
      return prev + curr.price * curr.quantity;
    }, 0);
  };

  const onClick = () => {
    dispatch(toggleCartHidden());
    setShowModal(true);
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
          <button onClick={onClick} className="checkoutBtn" type="button">
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
      <Modal open={showModal}>
        <div className="modalContentContainer">
          <div className="modalTitleAndCloseBtn">
            <h1>Checkout</h1>
            <CloseButton
              className="modalCloseBtn"
              onClick={() => setShowModal(false)}
            />
          </div>
          <p className="modalParagraph">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim ipsam
            voluptatem tempore porro!
          </p>
          <form>
            <div className="checkoutFormGroup">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={firstName}
                onChange={onChange}
                placeholder="Type your first name here"
              />
            </div>
            <div className="checkoutFormGroup">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={lastName}
                onChange={onChange}
                placeholder="Type your last name here"
              />
            </div>
            <div className="checkoutFormGroup">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={onChange}
                placeholder="Type your email address here"
              />
            </div>
            <div className="flex">
              <div className="checkoutFormGroup">
                <label htmlFor="birthDate">Date of Birth</label>
                <span className="datepicker-toggle">
                  <span className="datepicker-toggle-button"></span>
                  <input
                    type="date"
                    name="birthDate"
                    id="birthDate"
                    value={birthDate}
                    onChange={onChange}
                  />
                </span>
              </div>
              <div className="checkoutFormGroup">
                <label htmlFor="gender">Gender</label>
                <select
                  name="gender"
                  id="gender"
                  value={gender}
                  onChange={onChange}
                >
                  <option value="" disabled>
                    Choose your gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="checkoutFormGroup">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                id="address"
                placeholder="Type your address here"
                value={address}
                onChange={onChange}
              />
            </div>
            <div className="checkoutFormGroup">
              <label htmlFor="zipCode">Zip Code</label>
              <input
                type="text"
                name="zipCode"
                id="zipCode"
                placeholder="eg. 21310"
                value={zipCode}
                onChange={onChange}
              />
            </div>
            <div className="checkoutFormGroup">
              <input
                type="checkbox"
                name="agree"
                id="agree"
                value={agree}
                onChange={onBoolChange}
              />
              <label htmlFor="agree">I agree</label>
            </div>
            <button className="checkoutFormBtn" type="submit">
              Checkout
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default Cart;
