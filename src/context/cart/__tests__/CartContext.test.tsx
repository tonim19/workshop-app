import CartContextProvider from "../cartState";
import CartContext from "../cartContext";
import {
  addItem,
  removeItem,
  changeItemQuantity,
  clearItems,
  toggleCartHidden,
} from "../cartActions";
import { Item } from "../../../interfaces";
import { fireEvent, render, screen } from "@testing-library/react";

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

const workshop2: Item = {
  id: 2,
  title: "YouTube for your business!",
  desc: "Aleksandar Ašković aka Kojot is one of the pioneers when it comes to regional YouTube expertise. His tech journey started at the age of 12 when he inserted the first coin into the arcade machine. In 1997 he becomes editor of the renowned Serbian magazine “Svet Kompjutera” and in 2001 he started his first TV show called Game Over. After that, it was time to become a bit serious so in 2019 KursorTV was born, a TV show that was covering mostly tech topics. In 2014 Aleksandar decided to make a switch in his career and dedicate his time to YouTube. During the last 5 years, he was focused on helping brands utilize this platform to a full extent. Kojot considers YouTube channel of “Sport Klub” the prime example of YouTube SEO power. Thanks to the great content and good optimization Sport Klub channel reached[masked] subscribers in under 18 months.",
  price: 400,
  date: "2019-12-26T13:51:50.417-07:00",
  formattedDate: "26.12.2019",
  time: "13:51",
  quantity: 1,
  category: "marketing",
  userId: 2,
  imageUrl: "https://pbs.twimg.com/media/EL--sgSXYAAnOX2.jpg",
};

describe("Cart Context Tests", () => {
  it("dispatch toggleCartHidden toggles cart hidden", () => {
    render(
      <CartContextProvider>
        <CartContext.Consumer>
          {(value) => (
            <>
              <span>Current value: {JSON.stringify(value.state.hidden)}</span>
              <button onClick={() => value.dispatch(toggleCartHidden())}>
                Toggle Cart Hidden
              </button>
            </>
          )}
        </CartContext.Consumer>
      </CartContextProvider>
    );

    const button = screen.getByText("Toggle Cart Hidden");
    expect(screen.getByText("Current value: true")).toBeTruthy();
    fireEvent.click(button);
    expect(screen.getByText("Current value: false")).toBeTruthy();
  });

  it("dispatch addItem adds 1 item to cart", () => {
    render(
      <CartContextProvider>
        <CartContext.Consumer>
          {(value) => (
            <>
              <span>Current value: {value.state.cartItems.length}</span>
              <button onClick={() => value.dispatch(addItem(workshop, 1))}>
                Add Workshop To Cart
              </button>
            </>
          )}
        </CartContext.Consumer>
      </CartContextProvider>
    );
    const button = screen.getByText("Add Workshop To Cart");
    expect(screen.getByText("Current value: 0")).toBeTruthy();
    fireEvent.click(button);
    expect(screen.getByText("Current value: 1")).toBeTruthy();
  });

  it("dispatch addItem adds specified quantity", () => {
    render(
      <CartContextProvider>
        <CartContext.Consumer>
          {(value) => (
            <>
              <span>Current value: {value.state.cartItems[0]?.quantity}</span>
              <button onClick={() => value.dispatch(addItem(workshop, 5))}>
                Add Workshop To Cart
              </button>
            </>
          )}
        </CartContext.Consumer>
      </CartContextProvider>
    );
    const button = screen.getByText("Add Workshop To Cart");
    fireEvent.click(button);
    expect(screen.getByText("Current value: 5")).toBeTruthy();
  });

  it("dispatch changeItemQuantity changes item quantity", () => {
    render(
      <CartContextProvider>
        <CartContext.Consumer>
          {(value) => (
            <>
              <span>Current value: {value.state.cartItems[0]?.quantity}</span>
              <button onClick={() => value.dispatch(addItem(workshop, 5))}>
                Add Workshop To Cart
              </button>
              <button
                onClick={() => value.dispatch(changeItemQuantity(workshop, 2))}
              >
                Change Quantity
              </button>
            </>
          )}
        </CartContext.Consumer>
      </CartContextProvider>
    );
    const button = screen.getByText("Add Workshop To Cart");
    fireEvent.click(button);
    fireEvent.click(screen.getByText("Change Quantity"));
    expect(screen.getByText("Current value: 2")).toBeTruthy();
  });

  it("dispatch removeItem removes item from the cart", () => {
    render(
      <CartContextProvider>
        <CartContext.Consumer>
          {(value) => (
            <>
              <span>Current value: {value.state.cartItems.length}</span>
              <button onClick={() => value.dispatch(addItem(workshop, 5))}>
                Add Workshop To Cart
              </button>
              <button onClick={() => value.dispatch(removeItem(workshop))}>
                Remove Workshop From Cart
              </button>
            </>
          )}
        </CartContext.Consumer>
      </CartContextProvider>
    );
    const button = screen.getByText("Add Workshop To Cart");
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(screen.getByText("Remove Workshop From Cart"));
    expect(screen.getByText("Current value: 0")).toBeTruthy();
  });

  it("dispatch clearItems removes all items from cart", () => {
    render(
      <CartContextProvider>
        <CartContext.Consumer>
          {(value) => (
            <>
              <span>Current value: {value.state.cartItems.length}</span>
              <button onClick={() => value.dispatch(addItem(workshop, 5))}>
                Add Workshop To Cart
              </button>
              <button onClick={() => value.dispatch(addItem(workshop2, 2))}>
                Add Workshop2 To Cart
              </button>
              <button onClick={() => value.dispatch(clearItems())}>
                Clear Workshops From Cart
              </button>
            </>
          )}
        </CartContext.Consumer>
      </CartContextProvider>
    );
    const button = screen.getByText("Add Workshop To Cart");
    fireEvent.click(button);
    fireEvent.click(screen.getByText("Add Workshop2 To Cart"));
    fireEvent.click(screen.getByText("Clear Workshops From Cart"));
    expect(screen.getByText("Current value: 0")).toBeTruthy();
  });
});
