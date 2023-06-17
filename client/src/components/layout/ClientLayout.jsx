import React, { Suspense } from "react";
import ComponentLoading from "./ComponentLoading";
import { Outlet } from "react-router-dom";

const ClientLayout = () => {
  return (
    <div className="flex items-start w-full max-w-[1600px] m-auto">
      <div id="detail" className="overflow-y-auto overflow-x-hidden w-full p-2">
        <Suspense fallback={<ComponentLoading />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default ClientLayout;
