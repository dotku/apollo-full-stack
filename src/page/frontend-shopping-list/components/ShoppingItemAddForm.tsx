import { ShoppingListFormElement } from "..";
import { FormEvent } from "react";

export default function ShoppingItemAddForm({
  value,
  handleItemCreate,
  handleInputChange,
}: {
  value?: string;
  handleItemCreate: (e: FormEvent<ShoppingListFormElement>) => void;
  handleInputChange?: any;
}) {
  return (
    <form onSubmit={handleItemCreate}>
      <div className="input-group">
        <input
          value={value || ""}
          id="contentInput"
          placeholder="Place Your Item"
          className="form-control"
          onChange={handleInputChange}
          required
        />
        <button className="btn btn-outline-secondary" type="submit">
          Add
        </button>
      </div>
    </form>
  );
}
