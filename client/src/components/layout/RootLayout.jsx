import { Outlet, useNavigate, useResolvedPath } from "react-router-dom";
import Navigation from "../core/Navigator/Navigation";
import { Suspense, useEffect, useMemo } from "react";
import ComponentLoading from "./ComponentLoading";
import ViewLogin from "../../views/ViewLogin";
import useGlobalStore from "../../store/global.zustand";
import { notification } from "antd";
import { checkAccountPermission } from "../../utils/composables/useToken";
// import {
//   ClerkProvider,
//   RedirectToSignIn,
//   SignedIn,
//   SignedOut,
// } from "@clerk/clerk-react";
import Footer from "./Footer";
import ClientLayout from "./ClientLayout";
import AdminLayout from "./AdminLayout";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { SINGLE_MANAGEMENT_VIEWS } from "../../views/admin/viewProduct/composables/constants";

// if (!import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY) {
//   throw new Error("Missing Publishable Key");
// }
// const clerkPubKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;

const RootViewLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useResolvedPath();

  // Memo
  const isAdmin = useMemo(() => !pathname.includes("app"), [pathname]);

  // Store
  const { checkToken, handleLogout, user, hadnleGetSetting } = useGlobalStore((state) => state);

  // Function
  const handleValidateAuth = () => {
    if (["/", "/sale", "/product", "/category", ...SINGLE_MANAGEMENT_VIEWS].includes(pathname)) {
      if (!checkToken()) navigate("auth/admin");
      else {
        checkAccountPermission(checkToken, handleLogout, {
          navigate,
          pathname,
          notification,
        });
      }
    }
    if (["/app/cart", "/app/user/detail"].includes(pathname)) {
      if (!checkToken()) navigate("auth/app");
    }
  };

  useEffect(() => {
    handleValidateAuth();
    hadnleGetSetting();
  }, [pathname]);

  return (
    <div className="w-full">
      <Navigation />
      <Suspense fallback={<ComponentLoading />}>
        <PayPalScriptProvider
          options={{
            clientId:
              "AUZatVub5zKdTx0UNGs-djLa7-Ya08zzH3ePZRdkQdh4SLKgtD8l2W40Bc1wk37H_xJ3jAIPoVzndBwZ",
          }}
        >
          <RenderViewLayouts user={user} isAdmin={isAdmin} />
        </PayPalScriptProvider>
      </Suspense>
      <ViewLogin />
      <Footer />
    </div>
  );
};

function RenderViewLayouts({ user, isAdmin }) {
  if (!user) {
    if (!isAdmin) return <ClientLayout />;
    else return <Outlet />;
  } else if (isAdmin) return <AdminLayout />;
  else return <ClientLayout />;
}

export default RootViewLayout;
