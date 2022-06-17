import { screen, render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Workshops from "..";

const WorkshopCardWithRouter = () => {
  return (
    <Router>
      <Workshops />
    </Router>
  );
};

it("workshops are rendered to the screen", async () => {
  render(<WorkshopCardWithRouter />);
  const articlesBefore = screen.queryAllByRole("article");
  const articlesAfter = await screen.findAllByRole("article");
  expect(articlesBefore.length).toBe(0);
  expect(articlesAfter.length).toBe(9);
});
