import { beforeEach, describe, expect, it, vi } from "vitest";
import { useOutletContext } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { Product } from "../src/components/Products";
import userEvent from "@testing-library/user-event";

describe("Product component", () => {
  const product = {
    id: 1,
    title: "Product 1",
    image: "test-img-url",
    price: 2.99,
  };

  vi.mock("react-router-dom", () => ({
    useOutletContext: vi.fn(),
  }));

  let mockSetCartItems;
  let mockCartItems;

  beforeEach(() => {
    vi.clearAllMocks();
    mockSetCartItems = vi.fn();
    mockCartItems = [];

    useOutletContext.mockReturnValue([mockCartItems, mockSetCartItems]);
  });

  it("should allow user to type proper value (positive integer)", async () => {
    render(<Product product={product}></Product>);

    const countInput = screen.getByRole("textbox");
    await userEvent.clear(countInput);
    await userEvent.type(countInput, "7");
    expect(countInput.value).toBe("7");
  });

  it("should change empty input value to 1 on blur", async () => {
    render(<Product product={product}></Product>);

    const countInput = screen.getByRole("textbox");
    await userEvent.clear(countInput);

    expect(countInput.value).toBe("");

    await userEvent.tab();

    expect(countInput.value).toBe("1");
  });

  it("should prevent typing negative numbers", async () => {
    render(<Product product={product}></Product>);

    const countInput = screen.getByRole("textbox");

    await userEvent.clear(countInput);
    await userEvent.type(countInput, "-7");

    expect(countInput.value).toBe("7");
  });

  it("should prevent typing non-numeric characters", async () => {
    render(<Product product={product}></Product>);

    const countInput = screen.getByRole("textbox");

    await userEvent.clear(countInput);
    await userEvent.type(countInput, "aA!@#,.,.?eE()*+-");

    expect(countInput.value).toBe("");
  });

  it("should control input value with decrease and increase buttons", async () => {
    render(<Product product={product}></Product>);

    const countInput = screen.getByRole("textbox");
    const decButton = screen.getByRole("button", { name: "-" });
    const incButton = screen.getByRole("button", { name: "+" });

    await userEvent.click(decButton);

    expect(countInput.value).toBe("1");

    await userEvent.click(incButton);

    expect(countInput.value).toBe("2");

    await userEvent.click(decButton);

    expect(countInput.value).toBe("1");
  });

  it("should add a new item to cart when Add to cart button is clicked", async () => {
    render(<Product product={product}></Product>);

    const addToCartButton = screen.getByRole("button", {
      name: /add to cart/i,
    });

    await userEvent.click(addToCartButton);

    expect(mockSetCartItems).toHaveBeenCalledWith([
      {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        count: 1,
      },
    ]);
  });

  it("should increase the count of an existing item in cart when Add to cart button is clicked", async () => {
    useOutletContext.mockReturnValue([
      [{ ...product, count: 1 }],
      mockSetCartItems,
    ]);

    render(<Product product={product}></Product>);

    const addToCartButton = screen.getByRole("button", {
      name: /add to cart/i,
    });

    await userEvent.click(addToCartButton);

    expect(mockSetCartItems).toHaveBeenCalledWith([
      {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        count: 2,
      },
    ]);
  });
});
