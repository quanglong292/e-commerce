import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

// Components
import RootLayout from "./components/layout/RootLayout";
import ErrorPage from "./views/ErrorPage";
import ViewAppProductLayout from "./views/app/ViewProducts/root/ViewAppProductLayout";
const ViewRootProducts = lazy(() =>
  import("./views/admin/viewProduct/ViewRootProducts")
);
import ViewProducts from "./views/app/ViewProducts/ViewProducts.jsx";
import ViewCart from "./views/app/ViewCart/ViewCart";

// Const
import { APP_NAVIGATIONS } from "./utils/constants/sidebar.constant";
import ViewUserDetail from "./views/app/ViewUser/ViewUserDetail";
import ViewProductDetail from "./views/app/ViewProductDetail/index";
import ViewSearchProduct from "./views/app/ViewSearchProduct";
import ViewSale from "./views/admin/ViewSale";
import ViewAuthenticate from "./views/ViewAuthenticate/ViewAuthenticate";
import ViewDashBoard from "./views/admin/ViewDashBoard";
import ViewCartCheckout from "./views/app/ViewCart/ViewCartCheckout";
import ViewSetting from "./views/admin/ViewSetting";
import ViewWishList from "./views/app/ViewWishList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "auth/:app",
        element: <ViewAuthenticate />,
      },
      {
        path: "",
        isAdmin: true,
        element: <ViewSetting />,
      },
      {
        path: "sale",
        isAdmin: true,
        element: <ViewSale />,
      },
      {
        path: "product",
        isAdmin: true,
        element: <ViewRootProducts />,
      },
      {
        path: "user",
        isAdmin: true,
        element: <ViewRootProducts />,
      },
      {
        path: "orders",
        isAdmin: true,
        element: <ViewRootProducts />,
      },
      {
        path: "category",
        isAdmin: true,
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
          },
        ],
      },
      {
        path: "app/cart",
        element: <ViewCart />,
      },
      {
        path: "app/cart-checkout",
        element: <ViewCartCheckout />,
      },
      {
        path: "app/wish-list",
        element: <ViewWishList />,
      },
      {
        path: "app/user/detail",
        element: <ViewUserDetail />,
      },
      {
        path: "app/product/detail/:id",
        element: <ViewProductDetail />,
      },
      // CRM routes
      // {
      //   path: "crm/",
      //   element: <ViewAppProductLayout />,
      // },
    ],
  },
  {
    path: "/app/search",
    element: <ViewSearchProduct />,
    errorElement: <ErrorPage />,
  },
]);

export default router;
