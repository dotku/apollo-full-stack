import { ShoppingItem } from "..";

export default function ShoppingItemList({
  items = [],
  handleItemRemove,
}: {
  items: ShoppingItem[];
  handleItemRemove: (id: string) => () => void;
}): JSX.Element {
  return items.length ? (
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
