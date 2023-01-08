import { FormEvent, useState } from "react";
import ShoppingItemAddForm from "./components/ShoppingItemAddForm";
import ShoppingItemList from "./components/ShoppingItemList";
import { nanoid } from "nanoid";

export interface ShoppingItem {
  id: string;
  content: string;
}

const defaultShoppingItems = [
  {
    id: nanoid(),
    content: "apple",
  },
  {
    id: nanoid(),
    content: "banna",
  },
  {
    id: nanoid(),
    content: "cake",
  },
];

interface FormElements extends HTMLFormControlsCollection {
  contentInput: HTMLInputElement;
}

export interface ShoppingListFormElement extends HTMLFormElement {
  elements: FormElements;
}

export default function ReactShoppingList() {
  const [shoppingItems, setShoppingItems] =
    useState<ShoppingItem[]>(defaultShoppingItems);

  console.log("shoppingItems", shoppingItems);

  const handleItemRemove = (id: string) => () => {
    setShoppingItems((items) => items.filter((item) => item.id !== id));
  };

  const handleFormSubmit = (e: FormEvent<ShoppingListFormElement>) => {
    e.preventDefault();
    const content = e.currentTarget.elements.contentInput.value;
    // console.log(e.currentTarget.elements["contentInput"].value);
    console.log("ShoppingItems", shoppingItems);

    setShoppingItems((curr: ShoppingItem[]) => {
      return [
        ...curr,
        {
          id: nanoid(),
          content,
        },
      ];
    });

    e.currentTarget.elements.contentInput.value = "";
  };

  return (
    <div className="container">
      <h2 className="pt-3">Shopping List</h2>
      <div style={{ maxWidth: 500, padding: 10 }}>
        <ShoppingItemAddForm handleFormSubmit={handleFormSubmit} />
        <ShoppingItemList
          items={shoppingItems}
          handleItemRemove={handleItemRemove}
        />
      </div>
    </div>
  );
}
