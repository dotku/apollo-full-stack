import "./App.css";
import { defaultShoppingItems } from "./data/DefaultShoppingItems";
import FrontendShoppingList from "./page/frontend-shopping-list";
import { createHashRouter, RouterProvider } from "react-router-dom";
import AppReact from "./App.React";
import RESTfulShoppingList from "./page/restful-shopping-list";
import ZustandGetStarted from "./page/zustand-get-started";
import ZustandShoppingList from "./page/zustand-shopping-list";

// @note, use hashRouter here for github hosting
// github page won't able to support browserRouter due to server-side rendering
// feature was disabled.

const router = createHashRouter([
  {
    path: "/",
    element: <AppReact />,
  },
  {
    path: "/frontend",
    element: <FrontendShoppingList defaultData={defaultShoppingItems} />,
  },
  {
    path: "/restful",
    element: <RESTfulShoppingList />,
  },
  {
    path: "/zustand-get-started",
    element: <ZustandGetStarted />,
  },
  {
    path: "/zustand-shopping-list",
    element: <ZustandShoppingList />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
