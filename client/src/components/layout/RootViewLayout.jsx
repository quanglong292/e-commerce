import { Outlet, useNavigate, useResolvedPath } from "react-router-dom";
import Navigation from "../core/Navigator/Navigation";
import { Suspense, useEffect } from "react";
import ComponentLoading from "./ComponentLoading";
import ViewLogin from "../../views/ViewLogin";
import useGlobalStore from "../../store/global.zustand";

const RootViewLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useResolvedPath();

  // Store
  const checkToken = useGlobalStore((state) => state.checkToken);

  // Function
  const handleValidateAuth = () => {
    if (["/", "/sale", "/product"].includes(pathname)) {
      if (!checkToken()) navigate("auth/admin");
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
            <Outlet />
          </Suspense>
        </div>
      </div>
      <ViewLogin />
    </div>
  );
};

export default RootViewLayout;
