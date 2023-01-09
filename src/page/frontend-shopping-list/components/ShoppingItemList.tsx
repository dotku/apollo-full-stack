import { ShoppingItemType } from "../../../types/ShoppingItemType";

export default function ShoppingItemList({
  items = [],
  keywords,
  handleItemRemove,
}: {
  items?: ShoppingItemType[];
  keywords?: string;
  handleItemRemove: (id: string) => () => void;
}) {
  if (keywords) {
    items = items.filter((item) => item.content.includes(keywords));
  }
  return items && items.length ? (
    <ul className="list-group list-group-flush">
      {items.map((item, idx) => (
        <li
          className="list-group-item d-flex justify-content-between"
          key={idx}
        >
          <span>{item.content}</span>
          <span className="btn" onClick={handleItemRemove(item.id)}>
            x
          </span>
        </li>
      ))}
    </ul>
  ) : (
    <div>Empty Content</div>
  );
}
