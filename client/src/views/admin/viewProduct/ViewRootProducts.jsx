import { Suspense, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

// Components
import { Tabs } from "antd";
import ComponentLoading from "../../../components/layout/ComponentLoading";
import ProductLayout from "./elements/ProductLayout";

// Constants
import { VIEW_SCHEMAS, tabItems } from "./composables/constants";

const ViewRootProducts = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const query = useMemo(() => searchParams.get("type"), [searchParams]);
  const foundSchema = useMemo(
    () => VIEW_SCHEMAS[query ?? "group"] ?? {},
    [query]
  );

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
