import { FormEvent, useEffect, useMemo, useState } from "react";
import ShoppingItemAddForm from "./components/ShoppingItemAddForm";
import ShoppingItemList from "./components/ShoppingItemList";
import { nanoid } from "nanoid";
import { ShoppingItemType } from "../../types/ShoppingItemType";
import { Helmet } from "react-helmet";
import { debounce } from "lodash";

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
  const [keywords, setKeywords] = useState<string>("");

  const handleItemRemove = (id: string) => () => {
    setShoppingItems((items) => items.filter((item) => item.id !== id));
  };

  const handleItemCreate = (e: FormEvent<ShoppingListFormElement>) => {
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

    setKeywords("");
  };

  const handleInputChange = (e: any) => {
    console.log("handleInputChange", e.target.value);
    setKeywords(e.target.value);
  };

  // useEffect(() => {
  //   return () => {
  //     debouncedInputChange.cancel();
  //   };
  // }, []);

  return (
    <div className="container">
      <Helmet>
        <title>Frontend Shopping List</title>
      </Helmet>
      <h2 className="pt-3">Shopping List</h2>
      <div style={{ maxWidth: 500, padding: 10 }}>
        <ShoppingItemAddForm
          value={keywords}
          handleItemCreate={handleItemCreate}
          handleInputChange={handleInputChange}
        />
        <ShoppingItemList
          items={shoppingItems}
          handleItemRemove={handleItemRemove}
          keywords={keywords}
        />
      </div>
    </div>
  );
}
