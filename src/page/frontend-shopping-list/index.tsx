import { FormEvent, useState } from "react";
import ShoppingItemAddForm from "./components/ShoppingItemAddForm";
import ShoppingItemList from "./components/ShoppingItemList";
import { nanoid } from "nanoid";
import { ShoppingItemType } from "../../types/ShoppingItemType";

interface FormElements extends HTMLFormControlsCollection {
  contentInput: HTMLInputElement;
}

export interface ShoppingListFormElement extends HTMLFormElement {
  elements: FormElements;
}

export default function FrontendShoppingList({
  defaultData,
}: {
  defaultData?: ShoppingItemType[];
}) {
  const [shoppingItems, setShoppingItems] = useState<ShoppingItemType[]>(
    defaultData || []
  );

  const handleItemRemove = (id: string) => () => {
    setShoppingItems((items) => items.filter((item) => item.id !== id));
  };

  const handleFormSubmit = (e: FormEvent<ShoppingListFormElement>) => {
    e.preventDefault();
    const content = e.currentTarget.elements.contentInput.value;

    setShoppingItems((curr: ShoppingItemType[]) => {
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
