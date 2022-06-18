import React, { useContext, useEffect, useState } from "react";
import CategoryContext from "../../context/category/categoryContext";
import { formatDate } from "../../helpers/util-functions";
import { Item } from "../../interfaces";
import Spinner from "../Spinner";
import WorkshopCard from "../WorkshopCard";
import "./workshop-list.css";

function WorkshopsList({
  setDisplayedWorkshops,
}: {
  setDisplayedWorkshops: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { category } = useContext(CategoryContext);
  const [workshops, setWorkshops] = useState<Item[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [filteredWorkshops, setFilteredWorkshops] = useState<Item[] | null>(
    null
  );
  const [page, setPage] = useState(1);
  const [moreWorkshopsAvailable, setMoreWorkshopsAvailable] = useState(true);

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
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
          const { date, time } = formatDate(workshop.date);

          workshop.formattedDate = date;
          workshop.time = time;
        });
        setWorkshops(fetchedWorkshops);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
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
    if (filteredWorkshops) {
      setDisplayedWorkshops(filteredWorkshops.length);
    }
  }, [filteredWorkshops, setDisplayedWorkshops]);

  const fetchMoreWorkshops = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/workshops?_page=${page + 1}&_limit=9`
      );

      const fetchedWorkshops: Item[] = await response.json();

      if (fetchedWorkshops.length < 9) {
        setPage(1);
        setMoreWorkshopsAvailable(false);
      }

      if (workshops) {
        const newArr = [...workshops, ...fetchedWorkshops];

        newArr.sort((a, b) => {
          const firstDate = new Date(a.date).getTime();
          const secondDate = new Date(b.date).getTime();
          return secondDate - firstDate;
        });

        newArr.forEach((workshop: Item) => {
          const { date, time } = formatDate(workshop.date);

          workshop.formattedDate = date;
          workshop.time = time;
        });

        setWorkshops(newArr);
        setPage((prevState) => prevState + 1);
      }
    } catch (error) {}
  };

  if (loading) {
    return <Spinner />;
  }

  if (!workshops && !loading) {
    return (
      <div className="workshopNotFoundDiv">
        <h1>Im sorry we couldn't find no workshops</h1>
      </div>
    );
  }

  return (
    <>
      <div className="workshopList">
        {filteredWorkshops?.map((workshop) => (
          <WorkshopCard key={workshop.id} workshop={workshop} />
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
