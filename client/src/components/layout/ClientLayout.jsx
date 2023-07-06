import React, { Suspense, useEffect } from "react";
import ComponentLoading from "./ComponentLoading";
import { Outlet } from "react-router-dom";
import useGlobalStore from "../../store/global.zustand";

const ClientLayout = () => {
  const hadnleGetSetting = useGlobalStore((state) => state.hadnleGetSetting);

  useEffect(() => {
    hadnleGetSetting();
  }, []);

  return (
    <div className="flex items-start w-full max-w-[1600px] m-auto">
      <div
        id="detail"
        className="overflow-y-auto overflow-x-hidden w-full px-8 py-4"
      >
        <Suspense fallback={<ComponentLoading />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default ClientLayout;
