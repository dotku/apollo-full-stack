import { nanoid } from "nanoid";
import { ShoppingItemType } from "../types/ShoppingItemType";

export const defaultShoppingItems: ShoppingItemType[] = [
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
