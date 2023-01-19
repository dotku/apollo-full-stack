import "./App.css";
import { defaultShoppingItems } from "./data/DefaultShoppingItems";
import FrontendShoppingList from "./pages/frontend-shopping-list";
import {
  createHashRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import AppReact from "./App.React";
import RESTfulShoppingList from "./pages/restful-shopping-list";
import ZustandGetStarted from "./pages/zustand-get-started";
import ZustandShoppingList from "./pages/zustand-shopping-list";
import Home from "./pages/home";
import Insurrance, { InsurranceHome } from "./pages/insurance";
import InsurranceApplicationForm from "./pages/insurance/InsurranceApplicationForm";
import Vehicles from "./pages/insurance/InsurranceVehicles";

interface FullRouter {
  name: string;
  description?: string;
  path: string;
  element: JSX.Element;
  children?: RouteObject[];
}

export const fullRouter: FullRouter[] = [
  {
    name: "Index",
    description: "The home page display the content of table 123",
    path: "/",
    element: <Home />,
  },
  {
    name: "frontend",
    description: "A basic frontend interaction sample",
    path: "/frontend",
    element: <FrontendShoppingList defaultData={defaultShoppingItems} />,
  },
  {
    name: "insurance",
    path: "/insurrance",
    description: "a insurrance applicatnt handle app",
    element: <Insurrance />,
    children: [
      {
        path: "home",
        element: <InsurranceHome />,
      },
      {
        path: "vehicles",
        element: <Vehicles />,
      },
      {
        path: "resume/:id",
        element: <InsurranceApplicationForm />,
        loader: async ({ params }) => {
          try {
            return await fetch(
              `http://localhost:3030/insurance/resume/${params.id}`
            );
          } catch (e) {
            return e;
          }
        },
      },
      {
        path: "resume",
        element: <InsurranceApplicationForm />,
      },
    ],
  },
  {
    name: "Restful by using custom useFetch",
    description: "A good sample for basic frontend interaction",
    path: "/restful",
    element: <RESTfulShoppingList />,
  },
  {
    name: "Zustand Get Started",
    description: "A default sample grab from Zustand tutorial",
    path: "/zustand-get-started",
    element: <ZustandGetStarted />,
  },
  {
    name: "Zustand Shopping list",
    description: "Use Zustand created a shopping list page",
    path: "/zustand-shopping-list",
    element: <ZustandShoppingList />,
  },
  {
    name: "app react",
    description:
      "Default React App, a backup for future potential need, e.g. a onboarding practice page?",
    path: "/react-default-home",
    element: <AppReact />,
  },
];

// @note, use hashRouter here for github hosting
// github page won't able to support browserRouter due to server-side rendering
// feature was disabled.
const router = createHashRouter(
  fullRouter.map(({ path, element, children }) => ({ path, element, children }))
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
