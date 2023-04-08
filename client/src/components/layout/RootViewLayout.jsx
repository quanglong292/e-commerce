import { Outlet } from "react-router-dom";
import Navigation from "../core/Navigation";
import { Suspense } from "react";
import ComponentLoading from "./ComponentLoading";
// import Sidebar from "../core/Sidebar";

const RootViewLayout = () => {
  return (
    <div className="w-full">
      <Navigation />
      <div id="sidebar" className="flex items-start w-full max-w-[1440px] m-auto">
        <div
          id="detail"
          className="overflow-y-auto overflow-x-hidden w-full p-2"
        >
          <Suspense fallback={<ComponentLoading />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default RootViewLayout;
