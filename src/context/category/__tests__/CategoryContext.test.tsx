import { fireEvent, render, screen } from "@testing-library/react";
import CategoryContext from "../categoryContext";
import CategoryContextProvider from "../categoryState";

describe("Category Context Tests", () => {
  it("setCategory changes category", () => {
    render(
      <CategoryContextProvider>
        <CategoryContext.Consumer>
          {(value) => (
            <>
              <span>Current value: {value.category}</span>
              <button onClick={() => value.setCategory("design")}>
                Change Category Value
              </button>
            </>
          )}
        </CategoryContext.Consumer>
      </CategoryContextProvider>
    );
    const button = screen.getByText("Change Category Value");
    expect(screen.getByText("Current value: all")).toBeTruthy();
    fireEvent.click(button);
    expect(screen.getByText("Current value: design")).toBeTruthy();
  });
});
