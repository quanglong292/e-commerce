import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

// Components
import RootViewLayout from "./components/layout/RootViewLayout";
import ErrorPage from "./views/ErrorPage";
import ViewAppProductLayout from "./views/app/ViewProducts/root/ViewAppProductLayout";
const ViewRootProducts = lazy(() =>
  import("./views/admin/viewProduct/ViewRootProducts")
);
const ViewDashBoard = lazy(() => import("./views/ViewDashboard"));
import ViewProducts from "./views/app/ViewProducts/ViewProducts.jsx";
import ViewCart from "./views/app/ViewCart/ViewCart";

// Const
import { APP_NAVIGATIONS } from "./utils/constants/sidebar.constant";
import ViewUserDetail from "./views/app/ViewUser/ViewUserDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootViewLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "dashboard",
        element: <ViewDashBoard />,
      },
      {
        path: "product",
        element: <ViewRootProducts />,
      },
      // APP routes
      {
        path: "app/",
        element: <ViewAppProductLayout />,
        children: [
          {
            path: ":group",
            element: <ViewProducts />,
          }
        ],
      },
      {
        path: "app/cart",
        element: <ViewCart />,
      },
      {
        path: "app/user/detail",
        element: <ViewUserDetail />,
      },
      // CRM routes
      {
        path: "crm/",
        element: <ViewAppProductLayout />,
      },
    ],
  },
]);

export default router;
