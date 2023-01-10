import SimpleWarning from "../../components/SimpleWarning";
import { ShoppingItemType } from "../../types/ShoppingItemType";
import ShoppingItemList from "../frontend-shopping-list/components/ShoppingItemList";

export function RESTfulShoppingListContent({
  items,
  isLoading,
  error,
  handleItemRemove,
}: {
  items?: ShoppingItemType[];
  isLoading: boolean;
  error?: any;
  handleItemRemove?: <IDType, EventType>(id: IDType) => (e: EventType) => void;
}) {
  if (isLoading) return <div>Loading...</div>;
  if (error) return <SimpleWarning />;

  return <ShoppingItemList items={items} handleItemRemove={handleItemRemove} />;
}
