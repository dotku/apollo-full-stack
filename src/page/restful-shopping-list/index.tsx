import { debounce } from "lodash";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import ShoppingItemAddForm from "../frontend-shopping-list/components/ShoppingItemAddForm";
import { RESTfulShoppingListContent } from "./RESTfulShoppingListContent";

interface Env {
  REACT_APP_DEBOUNCE_WAIT?: number;
}

const { REACT_APP_DEBOUNCE_WAIT } = process.env as Env;
const TITLE = "RESTful Shoping List";

export default function RESTfulShoppingList() {
  const [keywords, setKeywords] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeywords(e.target.value);
  };

  const debounceHandleInputChange = debounce(
    handleInputChange,
    REACT_APP_DEBOUNCE_WAIT
  );

  useEffect(() => {
    return () => {
      debounceHandleInputChange.cancel();
    };
  });

  const RESTfulShoppingListContentCallback = useMemo(
    () => (
      <RESTfulShoppingListContent
        keywords={keywords}
        server={"http://localhost:3030/shopping-items"}
      />
    ),
    [keywords]
  );

  return (
    <div className="container">
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <h2 className="pt-3">{TITLE}</h2>
      <ShoppingItemAddForm
        handleInputChange={debounceHandleInputChange}
        placeholder="Enter your words to filter or create new"
      />
      <RESTfulShoppingListContent
        keywords={keywords}
        server={"http://localhost:3030/shopping-items"}
      />
    </div>
  );
}
