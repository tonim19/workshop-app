import { render, screen } from "@testing-library/react";
import WorkshopCard from "..";
import { BrowserRouter as Router } from "react-router-dom";
import { Item } from "../../../interfaces";

const workshop: Item = {
  id: 1,
  title: "When you get lost in API testing",
  desc: "The toughest part is probably to figure out which type of tests to write and how to test some specific logic in your app - but don't give up! Paula will present a few tips she learned along the way that will hopefully make your life easier. In this talk, you will hear about different test types and when to use them, real examples based on PHPUnit and Postman, followed by some tools for checking the test quality",
  price: 350,
  date: "2020-01-26T13:51:50.417-07:00",
  formattedDate: "26.01.2020",
  time: "13:51",
  quantity: 1,
  category: "backend",
  userId: 1,
  imageUrl: "https://pbs.twimg.com/media/EREoip3XsAEPDRp.jpg",
};

const WorkshopCardWithRouter = () => {
  return (
    <Router>
      <WorkshopCard workshop={workshop} />
    </Router>
  );
};

it("workshop card renders data appropriately", () => {
  render(<WorkshopCardWithRouter />);

  const article = screen.getByRole("article");
  const coverImage = screen.getByRole("img", { name: "workshop cover" });
  const categoryImage = screen.getByRole("img", { name: "" });
  const price = screen.getByRole("heading", {
    name: `${workshop.price},00 EUR`,
  });

  expect(article.id).toBe(workshop.id.toString());
  expect(coverImage.getAttribute("src")).toBe(workshop.imageUrl);
  expect(categoryImage.getAttribute("src")).toBe(
    `${workshop.category}-logo.png`
  );
  expect(screen.getByText(workshop.formattedDate)).toBeInTheDocument();
  expect(screen.getByText(workshop.time)).toBeInTheDocument();
  expect(screen.getByText(workshop.title)).toBeInTheDocument();
  expect(price).toBeInTheDocument();
});
