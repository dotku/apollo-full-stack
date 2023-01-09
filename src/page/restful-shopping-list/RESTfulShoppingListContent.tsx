import { useEffect, useState } from "react";
import SimpleWarning from "../../components/SimpleWarning";
import useFetch from "../../hook/useFetch";
import { ShoppingItemType } from "../../types/ShoppingItemType";
import ShoppingItemList from "../frontend-shopping-list/components/ShoppingItemList";

export function RESTfulShoppingListContent({
  keywords,
  server,
  handleItemRemove,
}: {
  keywords?: string;
  server: string;
  handleItemRemove?: <IDType, EventType>(id: IDType) => (e: EventType) => void;
}) {
  const {
    isLoading,
    data,
    error,
  }: {
    isLoading: boolean;
    data?: ShoppingItemType[];
    error?: any;
  } = useFetch<ShoppingItemType[]>(
    keywords ? `${server}/?q=${keywords}` : server
  );
  const [items, setItems] = useState<ShoppingItemType[] | undefined>([]);

  useEffect(() => {
    setItems(data);
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <SimpleWarning slog={error.toString()} />;

  return <ShoppingItemList items={items} handleItemRemove={handleItemRemove} />;
}
