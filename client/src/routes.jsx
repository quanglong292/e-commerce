import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

// Components
import RootViewLayout from "./components/layout/RootViewLayout";
import ViewAppProductLayout from "./components/layout/ViewAppProductLayout";
import ErrorPage from "./views/ErrorPage";
import ViewRootProducts from "./views/admin/viewProduct/ViewRootProducts";
import { APP_NAVIGATIONS } from "./utils/constants/sidebar.constant";

export const lazyLoad = (path) => {
  const Component = lazy(() => import(`./${path}`));
  return <Component />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootViewLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "dashboard",
        element: () => lazyLoad("views/ViewDashboard"),
      },
      // {
      //   path: "user",
      //   element: <ViewRootProducts />,
      // },
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
            element: lazyLoad("views/app/ViewProducts/ViewProducts.jsx"),
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
