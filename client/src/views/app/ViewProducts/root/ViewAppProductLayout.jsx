import React, { Suspense, useState } from "react";
import { Outlet, useResolvedPath } from "react-router-dom";
import FilterBar from "../elements/FilterBar";
import FilterBarController from "../elements/FilterBarController";
import CCarousel from "../../../../components/core/CCarousel";
import ViewLanding from "../elements/ViewLanding";
import Footer from "../../../../components/layout/Footer";

const ViewAppProductLayout = () => {
  const { pathname } = useResolvedPath();
  const [isShowFilter, setIsShowFilter] = useState(true);

  return (
    <div>
      {["/app/", "/app"].includes(pathname) ? (
        <ViewLanding />
      ) : (
        <>
          <FilterBarController
            clickShowFilter={() => setIsShowFilter(!isShowFilter)}
          />
          <div className="flex">
            {isShowFilter && <FilterBar />}
            <Suspense fallback={<div>Loading...</div>}>
              <Outlet />
            </Suspense>
          </div>
        </>
      )}
      <Footer />
    </div>
  );
};

export default ViewAppProductLayout;
