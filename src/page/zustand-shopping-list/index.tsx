import { nanoid } from "nanoid";
import { useRef } from "react";
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

function ZustandShoppingList() {
  const shoppingItems = useStore((state: StateType) => state.shoppingItems);
  const deleteShoppingItem = useStore(
    (state: StateType) => state.deleteShoppingItem
  );

  return (
    <div>
      <ul>
        {shoppingItems.map((item, idx) => (
          <li key={item.id}>
            {item.content}
            <button onClick={() => deleteShoppingItem(item.id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ZustandController() {
  const inputRef = useRef<HTMLInputElement>(null);
  const addShoppingItem = useStore(
    (state: StateType) => state.createShoppingItem
  );

  const handleItemCreate = () => {
    addShoppingItem(inputRef.current?.value);
    // inputRef.current = "";
  };

  return (
    <>
      <input ref={inputRef} />
      <button onClick={handleItemCreate}>Create</button>
    </>
  );
}

export default function ZustandShoppingListIndex() {
  return (
    <div className="container">
      <h1 className="pt-3">Zustand Shopping List</h1>
      <ZustandController />
      <ZustandShoppingList />
    </div>
  );
}
