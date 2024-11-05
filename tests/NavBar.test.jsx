import { render, screen } from "@testing-library/react";
import NavBar from "../src/components/NavBar";
import { describe, expect, it } from "vitest";
import { BrowserRouter } from "react-router-dom";

describe("NavBar component", () => {
  it("should not render cartCounter when cart is empty", () => {
    const cartItems = [];
    render(
      <BrowserRouter>
        <NavBar cartItems={cartItems}></NavBar>
      </BrowserRouter>
    );

    const cartCounter = screen.queryByTestId("cartCounter");
    expect(cartCounter).not.toBeVisible();
  });

  it("should render proper cartCounter when there are items in cart", () => {
    const cartItems = [
      {
        id: 1,
        title: "Product 1",
        price: 2.99,
        count: 2,
      },
      {
        id: 2,
        title: "Product 2",
        price: 5.99,
        count: 5,
      },
    ];

    render(
      <BrowserRouter>
        <NavBar cartItems={cartItems}></NavBar>
      </BrowserRouter>
    );

    const cartCounter = screen.queryByTestId("cartCounter");
    expect(cartCounter).toBeVisible();
    expect(cartCounter.textContent).toBe("7");
  });
});
