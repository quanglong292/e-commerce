import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

// Components
import RootViewLayout from "./components/layout/RootViewLayout";
import ErrorPage from "./views/ErrorPage";
import ViewAppProductLayout from "./components/layout/ViewAppProductLayout";
const ViewRootProducts = lazy(() =>
  import("./views/admin/viewProduct/ViewRootProducts")
);
const ViewDashBoard = lazy(() => import("./views/ViewDashboard"));
const ViewProducts = lazy(() =>
  import("./views/app/ViewProducts/ViewProducts.jsx")
);

// Const
import { APP_NAVIGATIONS } from "./utils/constants/sidebar.constant";

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
        children: APP_NAVIGATIONS.map((i) => {
          return {
            ...i,
            path: i.path.split("/")[1],
            element: <ViewProducts />,
          };
        }),
      },
    ],
  },
  {
    path: "/login",
    element: <RootViewLayout />,
    errorElement: <ErrorPage />,
  },
]);

export default router;
