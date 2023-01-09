import "./App.css";
import { defaultShoppingItems } from "./data/DefaultShoppingItems";
import FrontendShoppingList from "./page/frontend-shopping-list";

function App() {
  return <FrontendShoppingList defaultData={defaultShoppingItems} />;
}

export default App;
