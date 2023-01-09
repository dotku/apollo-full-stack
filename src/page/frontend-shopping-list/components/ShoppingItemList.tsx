import { useMemo } from "react";
import { ShoppingItemType } from "../../../types/ShoppingItemType";

export default function ShoppingItemList({
  items = [],
  keywords,
  handleItemRemove,
}: {
  items?: ShoppingItemType[];
  keywords?: string;
  handleItemRemove?: <IDType, EventType>(id: IDType) => (e?: EventType) => void;
}) {
  const newItems = useMemo(
    () =>
      keywords
        ? items.filter((item) => item.content.includes(keywords))
        : items,
    [keywords, items]
  );

  return newItems && newItems.length ? (
    <ul className="list-group list-group-flush">
      {newItems.map((item, idx) => (
        <li
          className="list-group-item d-flex justify-content-between"
          key={idx}
        >
          <span>{item.content}</span>
          <span
            className="btn"
            onClick={handleItemRemove && handleItemRemove(item.id)}
          >
            x
          </span>
        </li>
      ))}
    </ul>
  ) : (
    <div>Empty Content</div>
  );
}
