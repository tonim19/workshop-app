import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as CartIcon } from "../../assets/images/svg/cart-icon.svg";
import { ReactComponent as DateIcon } from "../../assets/images/svg/date-icon.svg";
import { ReactComponent as TimeIcon } from "../../assets/images/svg/time-icon.svg";
import { ReactComponent as DesignLogo } from "../../assets/images/svg/design-logo.svg";
import { addItem } from "../../context/cart/cartActions";
import CartContext from "../../context/cart/cartContext";
import CategoryContext from "../../context/category/categoryContext";
import { Item } from "../../interfaces";
import { numberWithCommas } from "../../helpers/util-functions";
import "./workshop-list.css";

function WorkshopsList({
  setDisplayedWorkshops,
}: {
  setDisplayedWorkshops: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { dispatch } = useContext(CartContext);
  const { category } = useContext(CategoryContext);
  const [workshops, setWorkshops] = useState<Item[] | null>(null);
  const [filteredWorkshops, setFilteredWorkshops] = useState<Item[] | null>(
    null
  );
  const [page, setPage] = useState(1);
  const [moreWorkshopsAvailable, setMoreWorkshopsAvailable] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkshops = async () => {
      const response = await fetch(
        "http://localhost:3000/workshops?_page=1&_limit=9"
      );
      const fetchedWorkshops: Item[] = await response.json();
      fetchedWorkshops.sort((a, b) => {
        const firstDate = new Date(a.date).getTime();
        const secondDate = new Date(b.date).getTime();
        return secondDate - firstDate;
      });

      fetchedWorkshops.forEach((workshop: Item) => {
        const fullDate = new Date(workshop.date);
        const date = fullDate.toLocaleDateString("hr").replaceAll(" ", "");
        const time =
          fullDate.toLocaleTimeString("hr", {
            hour: "2-digit",
            minute: "2-digit",
          }) + "h";
        workshop.date = date;
        workshop.time = time;
      });
      setWorkshops(fetchedWorkshops);
    };

    fetchWorkshops();
  }, []);

  useEffect(() => {
    if (workshops) {
      if (category === "all") {
        setFilteredWorkshops(workshops);
      } else {
        const filteredWorkshops = workshops?.filter(
          (workshop) => workshop.category === category
        );
        setFilteredWorkshops(filteredWorkshops);
      }
    }
  }, [category, workshops]);

  useEffect(() => {
    if (filteredWorkshops?.length) {
      setDisplayedWorkshops(filteredWorkshops.length);
    }
  }, [filteredWorkshops, setDisplayedWorkshops]);

  const fetchMoreWorkshops = async () => {
    const response = await fetch(
      `http://localhost:3000/workshops?_page=${page + 1}&_limit=9`
    );

    const fetchedWorkshops: Item[] = await response.json();

    if (fetchedWorkshops.length < 9) {
      setPage(1);
      setMoreWorkshopsAvailable(false);
    }

    fetchedWorkshops.sort((a, b) => {
      const firstDate = new Date(a.date).getTime();
      const secondDate = new Date(b.date).getTime();
      return secondDate - firstDate;
    });

    fetchedWorkshops.forEach((workshop: Item) => {
      const fullDate = new Date(workshop.date);
      const date = fullDate.toLocaleDateString("hr").replaceAll(" ", "");
      const time =
        fullDate.toLocaleTimeString("hr", {
          hour: "2-digit",
          minute: "2-digit",
        }) + "h";
      workshop.date = date;
      workshop.time = time;
    });

    if (workshops) {
      setWorkshops([...workshops, ...fetchedWorkshops]);
      setPage((prevState) => prevState + 1);
    }
  };

  const handleNavigate = (id: number) => {
    navigate(`/workshop/details/${id}`);
  };

  const addToCart = (workshop: Item, quantity: number) => {
    dispatch(addItem(workshop, quantity));
  };

  return (
    <>
      <div className="workshopList">
        {filteredWorkshops?.map((workshop) => (
          <article key={workshop.id}>
            <div className="workshopCoverDiv">
              <img
                src={workshop.imageUrl}
                alt="workshop cover"
                className="workshopCoverImage"
                onClick={() => handleNavigate(workshop.id)}
              />
              <img
                src={require(`../../assets/images/jpg/${workshop.category}-logo.png`)}
                width={32}
                height={32}
                className="categoryLogo"
                style={{ backgroundColor: "#000" }}
                alt=""
              />
            </div>
            <div className="workshopDetails">
              <div className="dateAndTime">
                <h6 className="date">
                  <DateIcon /> <span>{workshop.date}</span>
                </h6>
                <h6 className="time">
                  <TimeIcon /> <span>{workshop.time}</span>
                </h6>
              </div>
              <h4
                className="workshopTitle"
                onClick={() => handleNavigate(workshop.id)}
              >
                {workshop.title}
              </h4>
              <div className="workshopPriceAndBtn">
                <h3 className="workshopPrice">
                  {numberWithCommas(workshop.price)}
                </h3>
                <div
                  className="workshopCartIcon"
                  onClick={() => addToCart(workshop, 1)}
                >
                  <CartIcon className="workshopCart" />
                  <button className="addToCartBtn" type="button">
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
      {moreWorkshopsAvailable && (
        <button
          type="button"
          className="loadMoreBtn"
          onClick={fetchMoreWorkshops}
        >
          Load More
        </button>
      )}
    </>
  );
}

export default WorkshopsList;
