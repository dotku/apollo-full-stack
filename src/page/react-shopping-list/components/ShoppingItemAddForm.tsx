import { ShoppingListFormElement } from "..";
import { FormEvent } from "react";

export default function ShoppingItemAddForm({
  handleFormSubmit,
}: {
  handleFormSubmit: (e: FormEvent<ShoppingListFormElement>) => void;
}) {
  return (
    <form onSubmit={handleFormSubmit}>
      <div className="input-group">
        <input
          id="contentInput"
          placeholder="Place Your Item"
          className="form-control"
          required
        />
        <button className="btn btn-outline-secondary" type="submit">
          Add
        </button>
      </div>
    </form>
  );
}
