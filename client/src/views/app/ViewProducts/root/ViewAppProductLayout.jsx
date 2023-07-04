import React, { Suspense, lazy, useEffect, useMemo, useState } from "react";
import { Outlet, useResolvedPath } from "react-router-dom";
import FilterBarController from "../elements/FilterBarController";
import ComponentLoading from "../../../../components/layout/ComponentLoading";
import FilterBar from "../elements/FilterBar";
import useGlobalStore from "../../../../store/global.zustand";
import useProductStore from "../../../../store/product.zustand";

const ViewLanding = lazy(() => import("../elements/ViewLanding"));

const ViewAppProductLayout = () => {
  const { pathname } = useResolvedPath();
  // Store
  const { setToken } = useGlobalStore((state) => state);
  const fetchProduct = useProductStore((state) => state.fetch);

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
    fetchProduct("all");
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
            <div className={isShowFilter ? "hidden" : ""}>
              <FilterBar />
            </div>
            <Suspense fallback={<ComponentLoading />}>
              <Outlet />
            </Suspense>
          </div>
        </>
      )}
      {/* <Footer /> */}
    </div>
  );
};

export default ViewAppProductLayout;
