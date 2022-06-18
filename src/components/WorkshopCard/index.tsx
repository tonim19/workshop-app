import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as CartIcon } from "../../assets/images/svg/cart-icon.svg";
import { ReactComponent as DateIcon } from "../../assets/images/svg/date-icon.svg";
import { ReactComponent as TimeIcon } from "../../assets/images/svg/time-icon.svg";
import { addItem, toggleCartHidden } from "../../context/cart/cartActions";
import CartContext from "../../context/cart/cartContext";
import { numberWithCommas } from "../../helpers/util-functions";
import { Item } from "../../interfaces";
import "./workshop-card.css";

function WorkshopCard({ workshop }: { workshop: Item }) {
  const { dispatch } = useContext(CartContext);
  const navigate = useNavigate();

  const handleNavigate = (id: number) => {
    navigate(`/workshop/details/${id}`);
  };

  const addToCart = (workshop: Item, quantity: number) => {
    dispatch(addItem(workshop, quantity));
    dispatch(toggleCartHidden(false));
  };

  return (
    <article id={workshop.id.toString()}>
      <div className="workshopCoverDiv">
        <img
          src={workshop.imageUrl}
          alt="workshop cover"
          className="workshopCoverImage"
          onClick={() => handleNavigate(workshop.id)}
        />
        <img
          src={require(`../../assets/images/jpg/${workshop.category}-logo.png`)}
          className="categoryLogo"
          style={{ backgroundColor: "#000" }}
          alt=""
        />
      </div>
      <div className="workshopDetails">
        <div>
          <div className="dateAndTime">
            <p className="date">
              <DateIcon /> <span>{workshop.formattedDate}</span>
            </p>
            <p className="time">
              <TimeIcon /> <span>{workshop.time}</span>
            </p>
          </div>
          <h3
            className="workshopTitle"
            onClick={() => handleNavigate(workshop.id)}
          >
            {workshop.title}
          </h3>
        </div>
        <div className="workshopPriceAndBtn">
          <h4 className="workshopPrice">
            {numberWithCommas(workshop.price)}{" "}
            <span className="currency">EUR</span>
          </h4>
          <div
            className="workshopCartIcon"
            onClick={() => addToCart(workshop, 1)}
          >
            <CartIcon className="workshopCartBtn" />
            <button className="addToCartBtn" type="button">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default WorkshopCard;
