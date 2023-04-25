import React, { Suspense, lazy, useEffect, useMemo, useState } from "react";
import { Outlet, useResolvedPath } from "react-router-dom";
import FilterBarController from "../elements/FilterBarController";
import Footer from "../../../../components/layout/Footer";
import ComponentLoading from "../../../../components/layout/ComponentLoading";
import FilterBar from "../elements/FilterBar";
import useGlobalStore from "../../../../store/global.zustand";

const ViewLanding = lazy(() => import("../elements/ViewLanding"));

const ViewAppProductLayout = () => {
  const { pathname } = useResolvedPath();
  // Store
  const { setToken } = useGlobalStore((state) => state);

  // State
  const [isShowFilter, setIsShowFilter] = useState(true);

  // Memo
  const isViewLanding = useMemo(
    () => ["/app/", "/app"].includes(pathname),
    [pathname]
  );

  // Function
  const handleInitApp = () => {
    setToken();
  };

  // Effect
  useEffect(() => {
    handleInitApp();
  }, []);

  return (
    <div>
      {isViewLanding ? (
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
