import { ShoppingListFormElement } from "..";
import { FormEvent } from "react";

export default function ShoppingItemAddForm({
  value,
  placeholder,
  handleItemCreate,
  handleInputChange,
}: {
  value?: string;
  placeholder?: string;
  handleItemCreate?: (e: FormEvent<ShoppingListFormElement>) => void;
  handleInputChange?: any;
}) {
  return (
    <form onSubmit={handleItemCreate}>
      <div className="input-group">
        <input
          id="contentInput"
          placeholder={placeholder || "Place Your Item"}
          className="form-control"
          onChange={handleInputChange}
          required
        />
        {handleItemCreate && (
          <button className="btn btn-outline-secondary" type="submit">
            Add
          </button>
        )}
      </div>
    </form>
  );
}
