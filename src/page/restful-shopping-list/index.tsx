import { Helmet } from "react-helmet";
import { RESTfulShoppingListContent } from "./RESTfulShoppingListContent";

const TITLE = "RESTful Shoping List";

export default function RESTfulShoppingList() {
  return (
    <div className="container">
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <h2 className="pt-3">{TITLE}</h2>
      <div className="input-group">
        <input className="form-control" />
        <button className="btn btn-outline-secondary">Add</button>
      </div>
      <RESTfulShoppingListContent
        server={"http://localhost:3030/shopping-items"}
      />
    </div>
  );
}
