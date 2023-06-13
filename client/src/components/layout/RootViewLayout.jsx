import { Outlet, useNavigate, useResolvedPath } from "react-router-dom";
import Navigation from "../core/Navigator/Navigation";
import { Suspense, useEffect } from "react";
import ComponentLoading from "./ComponentLoading";
import ViewLogin from "../../views/ViewLogin";
import useGlobalStore from "../../store/global.zustand";
import { notification } from "antd";

import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";

if (!import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}
const clerkPubKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;

const RootViewLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useResolvedPath();

  // Store
  const { checkToken, handleLogout } = useGlobalStore((state) => state);

  // Function
  const handleValidateAuth = () => {
    if (["/", "/sale", "/product"].includes(pathname)) {
      if (!checkToken()) navigate("auth/admin");
      else {
        const permission = checkToken()?.["0"]?.permission;
        console.log({ permission });
        if (!permission || permission !== "admin") {
          notification.warning({
            message: "You don't have admin permission!",
            placement: "bottomLeft",
          });
          handleLogout();
          setTimeout(() => {
            navigate("/auth/admin");
          }, 500);
        }
      }
    }
  };

  useEffect(() => {
    handleValidateAuth();
  }, [pathname]);

  return (
    <div className="w-full">
      <Navigation />
      <div
        id="sidebar"
        className="flex items-start w-full max-w-[1600px] m-auto"
      >
        <div
          id="detail"
          className="overflow-y-auto overflow-x-hidden w-full p-2"
        >
          <Suspense fallback={<ComponentLoading />}>
            <ClerkProvider publishableKey={clerkPubKey}>
              <SignedIn>
                <Outlet />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </ClerkProvider>
          </Suspense>
        </div>
      </div>
      <ViewLogin />
    </div>
  );
};

export default RootViewLayout;
