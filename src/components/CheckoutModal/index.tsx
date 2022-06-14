import React, { FormEvent, useContext, useState } from "react";
import { ReactComponent as CloseButton } from "../../assets/images/svg/close-button.svg";
import { clearItems } from "../../context/cart/cartActions";
import CartContext from "../../context/cart/cartContext";
import Modal from "../Modal";

interface Props {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowThanksModal: React.Dispatch<React.SetStateAction<boolean>>;
}

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

function CheckoutModal({ showModal, setShowModal, setShowThanksModal }: Props) {
  const { state, dispatch } = useContext(CartContext);

  const [error, setError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [birthDateError, setBirthDateError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [zipCodeError, setZipCodeError] = useState("");
  const [agreeError, setAgreeError] = useState("");

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

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (state.cartItems.length === 0) {
      setError("Your cart is empty");
      return setTimeout(() => {
        setError("");
      }, 3000);
    }

    if (!firstName) {
      setFirstNameError("First Name is required");
      setTimeout(() => {
        setFirstNameError("");
      }, 3000);
    }

    if (!lastName) {
      setLastNameError("Last Name is required");
      setTimeout(() => {
        setLastNameError("");
      }, 3000);
    }

    if (!email) {
      setEmailError("Email is required");
      setTimeout(() => {
        setEmailError("");
      }, 3000);
    } else if (!email.includes("@")) {
      setEmailError("Invalid email address");
      setTimeout(() => {
        setEmailError("");
      }, 3000);
    }

    if (!birthDate) {
      setBirthDateError("Date is required");
      setTimeout(() => {
        setBirthDateError("");
      }, 3000);
    }

    if (!gender) {
      setGenderError("Gender is required");
      setTimeout(() => {
        setGenderError("");
      }, 3000);
    }

    if (!address) {
      setAddressError("Address is required");
      setTimeout(() => {
        setAddressError("");
      }, 3000);
    }

    if (!zipCode) {
      setZipCodeError("Zip Code is required");
      setTimeout(() => {
        setZipCodeError("");
      }, 3000);
    }

    if (agree === "false") {
      setAgreeError("You must agree to the terms of service");
      return setTimeout(() => {
        setAgreeError("");
      }, 3000);
    }

    dispatch(clearItems());
    setShowModal(false);
    setShowThanksModal(true);
  };

  return (
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
        <form onSubmit={onSubmit}>
          <div className="checkoutFormGroup">
            <label htmlFor="firstName">
              First Name <span className="error">{firstNameError}</span>
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={firstName}
              style={{ borderBottomColor: firstNameError ? "red" : "" }}
              onChange={onChange}
              placeholder="Type your first name here"
            />
          </div>
          <div className="checkoutFormGroup">
            <label htmlFor="lastName">
              Last Name <span className="error">{lastNameError}</span>
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={lastName}
              style={{ borderBottomColor: lastNameError ? "red" : "" }}
              onChange={onChange}
              placeholder="Type your last name here"
            />
          </div>
          <div className="checkoutFormGroup">
            <label htmlFor="email">
              Email Address <span className="error">{emailError}</span>
            </label>
            <input
              type="text"
              name="email"
              id="email"
              value={email}
              style={{ borderBottomColor: emailError ? "red" : "" }}
              onChange={onChange}
              placeholder="Type your email address here"
            />
          </div>
          <div className="flex">
            <div className="checkoutFormGroup">
              <label htmlFor="birthDate">
                Date of Birth <span className="error">{birthDateError}</span>
              </label>
              <span className="datepicker-toggle">
                <span className="datepicker-toggle-button"></span>
                <input
                  type="date"
                  name="birthDate"
                  id="birthDate"
                  value={birthDate}
                  style={{ borderBottomColor: birthDateError ? "red" : "" }}
                  onChange={onChange}
                />
              </span>
            </div>
            <div className="checkoutFormGroup">
              <label htmlFor="gender">
                Gender <span className="error">{genderError}</span>
              </label>
              <select
                name="gender"
                id="gender"
                value={gender}
                style={{ borderBottomColor: genderError ? "red" : "" }}
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
            <label htmlFor="address">
              Address <span className="error">{addressError}</span>
            </label>
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Type your address here"
              value={address}
              style={{ borderBottomColor: addressError ? "red" : "" }}
              onChange={onChange}
            />
          </div>
          <div className="checkoutFormGroup">
            <label htmlFor="zipCode">
              Zip Code <span className="error">{zipCodeError}</span>
            </label>
            <input
              type="text"
              name="zipCode"
              id="zipCode"
              placeholder="eg. 21310"
              value={zipCode}
              style={{ borderBottomColor: zipCodeError ? "red" : "" }}
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
            <label htmlFor="agree">
              I agree <span className="error">{agreeError}</span>
            </label>
          </div>
          <div className="error">{error}</div>
          <button className="checkoutFormBtn" type="submit">
            Checkout
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default CheckoutModal;
