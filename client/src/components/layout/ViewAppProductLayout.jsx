import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

const ViewAppProductLayout = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <div>Filter controller</div>
        <div className="flex">
          <div className="w-[30%]">Filter bar</div>
          <Outlet />
        </div>
      </div>
    </Suspense>
  );
};

export default ViewAppProductLayout;
