import { useEffect, useState } from "react";
import SimpleWarning from "../../components/SimpleWarning";
import useFetch from "../../hook/useFetch";
import { ShoppingItemType } from "../../types/ShoppingItemType";
import ShoppingItemList from "../frontend-shopping-list/components/ShoppingItemList";

export function RESTfulShoppingListContent({ server }: { server: string }) {
  const {
    isLoading,
    data,
    error,
  }: {
    isLoading: boolean;
    data?: ShoppingItemType[];
    error?: any;
  } = useFetch<ShoppingItemType[]>(server);
  const [items, setItems] = useState<ShoppingItemType[] | undefined>([]);

  useEffect(() => {
    setItems(data);
  }, [data]);

  const handleItemRemove = (id: string) => () => {
    setItems((items) => items?.filter((item) => item.id !== id));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <SimpleWarning slog={error.toString()} />;

  return <ShoppingItemList items={items} handleItemRemove={handleItemRemove} />;
}
