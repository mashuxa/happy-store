import { createBrowserRouter } from "react-router-dom";
import RootLayout from "src/components/RootLayout/RootLayout";
import AddProductPage from "src/pages/AddProductPage/AddProductPage";
import ErrorPage from "src/pages/ErrorPage/ErrorPage";
import InventoryPage from "src/pages/InventoryPage/InventoryPage";
import { ROUTES } from "./routes";

export const router = createBrowserRouter([
  {
    path: ROUTES.main,
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    // If we need to request the latest data every time the page is viewed, we can use this approach instead of
    // loading data once in ProductsProvider (depends on business requirements)
    // loader: getAllProducts,
    children: [
      {
        path: ROUTES.main,
        element: <InventoryPage />,
      },
      {
        path: ROUTES.addProduct,
        element: <AddProductPage />,
      },
    ],
  },
]);
