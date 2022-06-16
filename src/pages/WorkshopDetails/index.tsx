import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReactComponent as BackArrow } from "../../assets/images/svg/back-arrow.svg";
import { ReactComponent as DateIcon } from "../../assets/images/svg/date-icon.svg";
import { ReactComponent as TimeIcon } from "../../assets/images/svg/time-icon.svg";
import Spinner from "../../components/Spinner";
import WorkshopCard from "../../components/WorkshopCard";
import { addItem, toggleCartHidden } from "../../context/cart/cartActions";
import CartContext from "../../context/cart/cartContext";
import { formatDate, numberWithCommas } from "../../helpers/util-functions";
import { Item, User } from "../../interfaces";
import "./workshop-details.css";

function WorkshopDetails() {
  const { dispatch } = useContext(CartContext);
  const [workshops, setWorkshops] = useState<Item[] | null>(null);
  const [recommendWorkshops, setRecommendWorkshops] = useState<Item[] | null>(
    null
  );
  const [workshop, setWorkshop] = useState<Item | null>(null);
  const [author, setAuthor] = useState<User | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  const params = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const response = await fetch(`http://localhost:3000/workshops`);

        const fetchedWorkshops: Item[] = await response.json();

        fetchedWorkshops.sort((a, b) => {
          const firstDate = new Date(a.date).getTime();
          const secondDate = new Date(b.date).getTime();
          return secondDate - firstDate;
        });

        fetchedWorkshops.forEach((workshop: Item) => {
          const { date, time } = formatDate(workshop.date);
          workshop.formattedDate = date;
          workshop.time = time;

          if (workshop.id.toString() === params.workshopId) {
            setWorkshop(workshop);
          }
        });

        setWorkshops(fetchedWorkshops);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchWorkshops();
  }, [params.workshopId]);

  useEffect(() => {
    const filteredWorkshops = workshops
      ?.filter(
        (item) =>
          item.category === workshop?.category && item.id !== workshop.id
      )
      .slice(0, 3);

    if (filteredWorkshops) {
      setRecommendWorkshops(filteredWorkshops);
    }
  }, [workshops, workshop]);

  useEffect(() => {
    const fetchAuthor = async () => {
      if (!workshop?.userId) return;

      const response = await fetch(
        `http://localhost:3000/users/${workshop.userId}`
      );

      const author = await response.json();

      setAuthor(author);
    };

    fetchAuthor();
  }, [workshop]);

  const onNavigateBack = () => {
    navigate("/");
  };

  const onChangeQuantity = (e: ChangeEvent<HTMLSelectElement>) => {
    setQuantity(parseInt(e.target.value));
  };

  const onAddItemToCart = (workshop: Item | null) => {
    if (!workshop) return;
    dispatch(addItem(workshop, quantity));
    dispatch(toggleCartHidden());
  };

  if (loading) {
    return <Spinner />;
  }

  if (!workshop && !loading) {
    return (
      <div className="workshopNotFoundDiv">
        <h1>Im sorry we couldn't find this workshop</h1>
      </div>
    );
  }

  return (
    <>
      <div className="detailsContainer">
        <aside>
          <div className="backArrowDiv">
            <BackArrow onClick={onNavigateBack} className="backArrow" />{" "}
            <span onClick={onNavigateBack} className="backArrowText">
              Back
            </span>
          </div>
        </aside>
        <section className="wokshopDetailsSection">
          <div className="coverImageDiv">
            <img
              className="coverImage"
              src={workshop?.imageUrl}
              alt="workshopCover"
            />
            <img
              src={require(`../../assets/images/jpg/${workshop?.category}-logo.png`)}
              className="workshopCategoryLogo"
              style={{ backgroundColor: "#000" }}
              alt=""
            />
          </div>
          <div className="workshopDetailsDiv">
            <div className="aboutWorkshopDiv">
              <div className="workshopDetailsDateAndTime">
                <p className="date">
                  <DateIcon /> <span>{workshop?.formattedDate}</span>
                </p>
                <p className="time">
                  <TimeIcon /> <span>{workshop?.time}</span>
                </p>
              </div>
              <h1 className="workshopDetailsTitle">{workshop?.title}</h1>
              <p className="authorNameParagraph">
                <strong>
                  WITH <span className="authorName">{author?.name}</span>
                </strong>
              </p>
              <p className="workshopDescription">{workshop?.desc}</p>
            </div>
            <div className="buyTicketDiv">
              <p className="buyTicketParagraph">
                <strong>Buy Your Ticket</strong>
              </p>
              <p className="ticketPrice">
                <strong>
                  {numberWithCommas(workshop?.price)}{" "}
                  <span className="currency">EUR</span>
                </strong>
              </p>
              <div className="ticketQuantityAndBtn">
                <div className="ticketQuantity">
                  <select value={quantity} onChange={onChangeQuantity}>
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
                <button
                  onClick={() => onAddItemToCart(workshop)}
                  className="addToCartDetailsBtn"
                  type="button"
                >
                  Add To Cart
                </button>
              </div>
              <p className="ticketSubtotal">
                Subtotal:{" "}
                {numberWithCommas(workshop?.price && workshop.price * quantity)}{" "}
                <span className="currency">EUR</span>
              </p>
            </div>
          </div>
        </section>
      </div>
      {recommendWorkshops && recommendWorkshops?.length > 0 && (
        <section className="similarWorkshopsSection">
          <div className="detailsContainer">
            <div></div>
            <div>
              <h2 className="similarWorkshopsTitle">Similar Workshops</h2>
              <div className="similarWorkshopsList">
                {recommendWorkshops?.map((workshop) => (
                  <WorkshopCard key={workshop.id} workshop={workshop} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default WorkshopDetails;
