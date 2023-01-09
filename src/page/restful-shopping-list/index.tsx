import { debounce } from "lodash";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import SimpleWarning from "../../components/SimpleWarning";
import useFetch from "../../hook/useFetch";
import { ShoppingItemType } from "../../types/ShoppingItemType";
import { ShoppingListFormElement } from "../frontend-shopping-list";
import ShoppingItemAddForm from "../frontend-shopping-list/components/ShoppingItemAddForm";
import { RESTfulShoppingListContent } from "./RESTfulShoppingListContent";

interface Env {
  REACT_APP_DEBOUNCE_WAIT?: number;
  REACT_APP_SERVER_URL?: string;
}

const { REACT_APP_DEBOUNCE_WAIT, REACT_APP_SERVER_URL } = process.env as Env;
const TITLE = "RESTful Shoping List";

export default function RESTfulShoppingList() {
  const { isLoading, data, error } = useFetch<ShoppingItemType[]>(
    `${REACT_APP_SERVER_URL}/shopping-items`
  );

  const [keywords, setKeywords] = useState<string>("");
  const [items, setItems] = useState<ShoppingItemType[] | undefined>([]);
  const [appError, setAppError] = useState<
    Error | undefined | Boolean | string
  >(error);
  const [appIsLoading, setAppIsLoading] = useState(true);
  const searchInputRef = useRef<HTMLInputElement>();
  const formRef = useRef<HTMLFormElement>();

  const fetchData = () => {
    setItems(data);
    setAppIsLoading(isLoading);
    setAppError(error || "");
    fetch(`${REACT_APP_SERVER_URL}/shopping-items/${keywords}`)
      .then((rsp) => rsp.json())
      .then((rsp) => setItems(rsp))
      .catch((error) => {
        console.error(error);
        setAppError(error);
      })
      .finally(() => setAppIsLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [keywords]);

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

  const handleItemRemove =
    <T1, T2>(id: T1) =>
    (_e: T2) => {
      fetch(`${REACT_APP_SERVER_URL}/shopping-items/${id}`, {
        method: "DELETE",
      })
        .then((rsp) => rsp.json())
        .then((rsp) => setItems(rsp))
        .catch((e) => {});
    };

  const handleItemCreate = (e: FormEvent<ShoppingListFormElement>) => {
    e.preventDefault();
    fetch(`${REACT_APP_SERVER_URL}/shopping-items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: keywords }),
    })
      .then((rsp) => rsp.json())
      .then((rsp) => setItems(rsp.data))
      .catch((error) => setAppError(error))
      .finally(() => {
        setKeywords("");
        if (searchInputRef) {
          formRef.current?.reset();
        }
      });
  };

  return (
    <div className="container">
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <h2 className="pt-3">{TITLE}</h2>
      <ShoppingItemAddForm
        formRef={formRef}
        handleInputChange={debounceHandleInputChange}
        handleItemCreate={handleItemCreate}
        placeholder="Enter your words to filter or create new"
      />
      <div className="mt-1">
        {appError ? (
          <SimpleWarning />
        ) : (
          <RESTfulShoppingListContent
            isLoading={appIsLoading}
            items={items}
            handleItemRemove={handleItemRemove}
          />
        )}
      </div>
    </div>
  );
}
