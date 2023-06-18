import React, { Suspense } from "react";
import ComponentLoading from "./ComponentLoading";
import { Outlet } from "react-router-dom";
import Sidebar from "../core/Sidebar";
import useGlobalStore from "../../store/global.zustand";

const AdminLayout = () => {
  const user = useGlobalStore((state) => state.user);
  return (
    <div className="flex w-full min-h-[90vh]">
      {user && <Sidebar />}
      <div id="detail" className="overflow-y-auto overflow-x-hidden w-full p-4">
        <Suspense fallback={<ComponentLoading />}>
          {user && <Outlet />}
        </Suspense>
      </div>
    </div>
  );
};

export default AdminLayout;
