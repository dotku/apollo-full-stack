import "./App.css";
import { defaultShoppingItems } from "./data/DefaultShoppingItems";
import FrontendShoppingList from "./pages/frontend-shopping-list";
import { createHashRouter, RouterProvider } from "react-router-dom";
import AppReact from "./App.React";
import RESTfulShoppingList from "./pages/restful-shopping-list";
import ZustandGetStarted from "./pages/zustand-get-started";
import ZustandShoppingList from "./pages/zustand-shopping-list";
import Home from "./pages/home";

interface FullRouter {
  name: string;
  description?: string;
  path: string;
  element: JSX.Element;
}

export const fullRouter: FullRouter[] = [
  {
    name: "Index",
    description: "The home page display the content of table",
    path: "/",
    element: <Home />,
  },
  {
    name: "app react",
    description:
      "Default React App, a backup for future potential need; eg a onboarding practice page?",
    path: "/react-default-home",
    element: <AppReact />,
  },
  {
    name: "frontend",
    description: "A basic frontend interaction sample",
    path: "/frontend",
    element: <FrontendShoppingList defaultData={defaultShoppingItems} />,
  },
  {
    name: "Restful by using custom useFetch",
    description: "A good sample for basic frontend interaction",
    path: "/restful",
    element: <RESTfulShoppingList />,
  },
  {
    name: "zustand sample project",
    description: "A default sample grab from Zustand tutorial",
    path: "/zustand-get-started",
    element: <ZustandGetStarted />,
  },
  {
    name: "zustand shopping list",
    description: "Use Zustand created a shopping list page",
    path: "/zustand-shopping-list",
    element: <ZustandShoppingList />,
  },
];

// @note, use hashRouter here for github hosting
// github page won't able to support browserRouter due to server-side rendering
// feature was disabled.
const router = createHashRouter(
  fullRouter.map(({ path, element }) => ({ path, element }))
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
