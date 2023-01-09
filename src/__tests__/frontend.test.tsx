import { render, screen } from "@testing-library/react";
import FrontendShoppingList from "../page/frontend-shopping-list";
import { defaultShoppingItems } from "../data/DefaultShoppingItems";

jest.mock("nanoid", () => {
  return { nanoid: () => "1234" };
});

test("empty component", () => {
  render(<FrontendShoppingList />);
  const contentElement = screen.getByText("Empty Content");
  expect(contentElement).toBeInTheDocument();
});

test("with mock data component", () => {
  render(<FrontendShoppingList defaultData={defaultShoppingItems} />);
  const contentElement = screen.getByText("apple");
  expect(contentElement).toBeInTheDocument();
});
