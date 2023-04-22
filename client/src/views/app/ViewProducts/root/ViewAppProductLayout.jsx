import React, { Suspense, lazy, useState } from "react";
import { Outlet, useResolvedPath } from "react-router-dom";
import FilterBar from "../elements/FilterBar";
import FilterBarController from "../elements/FilterBarController";
import Footer from "../../../../components/layout/Footer";
import ComponentLoading from "../../../../components/layout/ComponentLoading";

const ViewLanding = lazy(() => import("../elements/ViewLanding"))

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
            <Suspense fallback={<ComponentLoading />}>
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
