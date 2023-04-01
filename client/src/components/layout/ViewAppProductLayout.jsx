import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

const ViewAppProductLayout = () => {
  return (
    <div>
      <div>Filter controller</div>
      <div className="flex">
        <div className="w-[30%]">Filter bar</div>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default ViewAppProductLayout;
