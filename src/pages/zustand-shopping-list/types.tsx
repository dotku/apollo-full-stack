import { ShoppingItemType } from "../../types/ShoppingItemType";

export interface StateType {
  shoppingItems: ShoppingItemType[];
  createShoppingItem: (content?: string) => void;
  deleteShoppingItem: (id: string) => void;
}
