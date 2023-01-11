import { nanoid } from "nanoid";
import { FormEvent, useRef } from "react";
import create from "zustand";
import { ShoppingItemType } from "../../types/ShoppingItemType";

interface StateType {
  shoppingItems: ShoppingItemType[];
  createShoppingItem: (content?: string) => void;
  deleteShoppingItem: (id: string) => void;
}

const useStore = create<StateType>((set) => ({
  shoppingItems: [
    {
      id: nanoid(),
      content: "Apple",
    },
    {
      id: nanoid(),
      content: "Banna",
    },
  ],
  createShoppingItem: (content?: string) => {
    set((state: StateType) => {
      console.log("createShoppingItem");
      return {
        shoppingItems: [
          ...state.shoppingItems,
          { id: nanoid(), content: content || "" },
        ],
      };
    });
  },
  deleteShoppingItem: (id: string) => {
    set((state: StateType) => {
      console.log("deleteShoppingItem");
      return {
        shoppingItems: state.shoppingItems.filter((item) => item.id !== id),
      };
    });
  },
}));

function ZustandShoppingList({ className }: { className: string }) {
  const shoppingItems = useStore((state: StateType) => state.shoppingItems);
  const deleteShoppingItem = useStore(
    (state: StateType) => state.deleteShoppingItem
  );

  return (
    <div className={className}>
      {shoppingItems.length ? (
        <ul className="list-group">
          {shoppingItems.map((item, idx) => (
            <li
              key={idx}
              className="list-group-item d-flex justify-content-between"
            >
              <div className="lh-lg">{item.content}</div>
              <button
                className="btn "
                onClick={() => deleteShoppingItem(item.id)}
              >
                x
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <span>Empty Content</span>
      )}
    </div>
  );
}

function ZustandController() {
  const inputRef = useRef<HTMLInputElement>(null);
  const addShoppingItem = useStore(
    (state: StateType) => state.createShoppingItem
  );

  const handleItemCreate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addShoppingItem(inputRef.current?.value);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <form onSubmit={handleItemCreate} className="input-group">
      <input ref={inputRef} className="form-control" />
      <button className="btn btn-outline-secondary" type="submit">
        Create
      </button>
    </form>
  );
}

export default function ZustandShoppingListIndex() {
  return (
    <div className="container">
      <h1 className="pt-3">Zustand Shopping List</h1>
      <ZustandController />
      <ZustandShoppingList className="mt-2" />
    </div>
  );
}
