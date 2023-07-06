import { Suspense, useMemo } from "react";
import { useResolvedPath, useSearchParams } from "react-router-dom";

// Components
import { Tabs } from "antd";
import ComponentLoading from "../../../components/layout/ComponentLoading";
import ProductLayout from "./elements/ProductLayout";

// Constants
import {
  SINGLE_MANAGEMENT_VIEWS,
  VIEW_SCHEMAS,
  tabItems,
} from "./composables/constants";

const ViewRootProducts = () => {
  const { pathname } = useResolvedPath();
  let [searchParams, setSearchParams] = useSearchParams();
  const query = useMemo(() => searchParams.get("type"), [searchParams]);
  const foundSchema = useMemo(() => {
    let key = query ?? "group";

    if (SINGLE_MANAGEMENT_VIEWS.includes(pathname))
      key = pathname.split("/")[1];

    return VIEW_SCHEMAS[key] ?? {};
  }, [query, pathname]);

  // console.log({ a: pathname.split("/")[1] });

  if (SINGLE_MANAGEMENT_VIEWS.includes(pathname))
    return <ProductLayout {...foundSchema} />;

  const handleChangeLink = (e) => {
    setSearchParams({ type: e });
  };

  return (
    <div>
      <Suspense fallback={<ComponentLoading />}>
        <Tabs
          defaultActiveKey={query}
          items={tabItems.map((i) => ({
            ...i,
            children: <ProductLayout {...foundSchema} />,
          }))}
          onChange={handleChangeLink}
        />
      </Suspense>
    </div>
  );
};

export default ViewRootProducts;
