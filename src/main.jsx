import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import {ResourcesProvider} from "./contexts/ResourcesContext.jsx";

import HomePage from "./pages/HomePage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import ResourcesPage from "./pages/ResourcesPage.jsx";
import ReferencePage from "./pages/ReferencePage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "resources",
        element: <ResourcesPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "references",
        element: <ReferencePage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <ResourcesProvider>
    <RouterProvider router={router} />
  </ResourcesProvider>
);
