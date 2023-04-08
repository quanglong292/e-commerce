import React, { Suspense, useState } from "react";
import { Outlet } from "react-router-dom";
import FilterBar from "./FilterBar";
import FilterBarController from "./FilterBarController";

const ViewAppProductLayout = () => {
  const [isShowFilter, setIsShowFilter] = useState(true);
  return (
    <div>
      <FilterBarController
        clickShowFilter={() => setIsShowFilter(!isShowFilter)}
      />
      <div className="flex">
        {isShowFilter && <FilterBar />}
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default ViewAppProductLayout;
