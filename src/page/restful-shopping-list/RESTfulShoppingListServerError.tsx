import { Helmet } from "react-helmet";
import { RESTfulShoppingListContent } from "./RESTfulShoppingListContent";

const TITLE = "RESTful Shoping List";

export default function RESTfulShoppingListServerError() {
  return (
    <div className="container">
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <h2 className="pt-3">{TITLE}</h2>
      <RESTfulShoppingListContent
        server={"http://localhost:3030/shopping-item"}
      />
    </div>
  );
}
