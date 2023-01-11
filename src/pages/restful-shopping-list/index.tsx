import { debounce } from "lodash";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Helmet } from "react-helmet";
import SimpleWarning from "../../components/SimpleWarning";
import useFetch from "../../hook/useFetch";
import { ShoppingItemType } from "../../types/ShoppingItemType";
import { ShoppingListFormElement } from "../frontend-shopping-list/types";
import ShoppingItemAddForm from "../frontend-shopping-list/components/ShoppingItemAddForm";
import { RESTfulShoppingListContent } from "./RESTfulShoppingListContent";
import { Env } from "./types";

const { REACT_APP_DEBOUNCE_WAIT, REACT_APP_SERVER_URL } = process.env as Env;
const TITLE = "RESTful Shoping List";

// @todo need improve the feature

export default function RESTfulShoppingList() {
  // @todo query will cause useCallback keep running
  const { isLoading, data, error, del, post } = useFetch<ShoppingItemType[]>(
    `${REACT_APP_SERVER_URL}/shopping-items`
  );

  const [ifAlert, setIfAlert] = useState(error ? true : false);
  const [keywords, setKeywords] = useState<string>("");
  const [items, setItems] = useState<ShoppingItemType[] | undefined>([]);
  const [appIsLoading, setAppIsLoading] = useState(true);
  const searchInputRef = useRef<HTMLInputElement>();
  const formRef = useRef<HTMLFormElement>();

  const fetchData = useCallback(() => {
    setAppIsLoading(true);
    fetch(`${REACT_APP_SERVER_URL}/shopping-items/${keywords}`)
      .then((rsp) => rsp.json())
      .then((rsp) => setItems(rsp))
      .catch((error) => {
        console.error(error);
        setIfAlert(true);
      })
      .finally(() => setAppIsLoading(false));
  }, [keywords]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    // @note keywords and the inut view should be splited for debouncing
    // update purpose; keywords would be the final string for query, and
    // input would be just the view for the user
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
  }, [debounceHandleInputChange]);

  const handleItemCreate = (e: FormEvent<ShoppingListFormElement>) => {
    e.preventDefault();
    const { elements } = formRef.current as ShoppingListFormElement;

    // @note change keywords would cause the program re-fetch data, no
    // rsp.json() is required
    post({ content: elements.contentInput.value })
      .catch((error) => {
        console.error(error);
        setIfAlert(true);
      })
      .finally(() => {
        setKeywords("");
        if (searchInputRef) {
          formRef.current?.reset();
        }
      });
  };

  const handleItemRemove =
    <IDType, EventType>(id: IDType) =>
    (_e: EventType) => {
      del(`${REACT_APP_SERVER_URL}/shopping-items/${id}`)
        .then(() => fetchData())
        .catch((e) => {
          console.error(e);
          setIfAlert(true);
        });
    };

  return (
    <div className="container">
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <h2 className="pt-3">{TITLE}</h2>
      {ifAlert && <SimpleWarning onClose={() => setIfAlert(false)} />}
      <ShoppingItemAddForm
        formRef={formRef}
        handleInputChange={debounceHandleInputChange}
        handleItemCreate={handleItemCreate}
        placeholder="Enter your words to filter or create new"
      />
      <div className="mt-1">
        <RESTfulShoppingListContent
          isLoading={appIsLoading}
          items={items}
          handleItemRemove={handleItemRemove}
        />
      </div>
    </div>
  );
}
