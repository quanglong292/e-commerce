import { Suspense, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

// Components
import { Tabs } from "antd";
import ComponentLoading from "../../../components/layout/ComponentLoading";
import ProductLayout from "./elements/ProductLayout";

// Constands
import { CATEGORY_GROUP_TABLE_COLUMN } from "../../../utils/constants/columns.constant";
import { REQUEST_PARAMS } from "../../../utils/constants/urlPath.constant";

const ADD_NEW_SCHEMA = [
  {
    label: "Group name",
    type: "Text",
    field: "name",
  },
];

const VIEW_SCHEMAS = {
  group: {
    viewName: "Category Group",
    schemas: {
      columns: CATEGORY_GROUP_TABLE_COLUMN,
      formSchema: [
        {
          label: "Group name",
          type: "Text",
          field: "name",
        },
      ],
      requets: {
        GET_TABLE_ITEMS: REQUEST_PARAMS.GET_CATEGORY_GROUP,
        ADD_TABLE_ITEM: REQUEST_PARAMS.ADD_CATEGORY_GROUP,
        DELETE_TABLE_ITEM: REQUEST_PARAMS.DELETE_CATEGORY_GROUP,
      },
    },
  },
  categories: {
    viewName: "Categories",
    schemas: {
      columns: CATEGORY_GROUP_TABLE_COLUMN,
      formSchema: ADD_NEW_SCHEMA,
      requets: {
        GET_TABLE_ITEMS: REQUEST_PARAMS.GET_CATEGORY_GROUP,
        ADD_TABLE_ITEM: REQUEST_PARAMS.ADD_CATEGORY_GROUP,
        DELETE_TABLE_ITEM: REQUEST_PARAMS.DELETE_CATEGORY_GROUP,
      },
    },
  },
  brands: {
    viewName: "brands",
    schemas: {
      columns: CATEGORY_GROUP_TABLE_COLUMN,
      formSchema: ADD_NEW_SCHEMA,
      requets: {
        GET_TABLE_ITEMS: REQUEST_PARAMS.GET_CATEGORY_GROUP,
        ADD_TABLE_ITEM: REQUEST_PARAMS.ADD_CATEGORY_GROUP,
        DELETE_TABLE_ITEM: REQUEST_PARAMS.DELETE_CATEGORY_GROUP,
      },
    },
  },
  products: {
    viewName: "products",
    schemas: {
      columns: CATEGORY_GROUP_TABLE_COLUMN,
      formSchema: ADD_NEW_SCHEMA,
      requets: {
        GET_TABLE_ITEMS: REQUEST_PARAMS.GET_CATEGORY_GROUP,
        ADD_TABLE_ITEM: REQUEST_PARAMS.ADD_CATEGORY_GROUP,
        DELETE_TABLE_ITEM: REQUEST_PARAMS.DELETE_CATEGORY_GROUP,
      },
    },
  },
};

const tabItems = [
  {
    key: "group",
    label: `Category Group`,
  },
  {
    key: "categories",
    label: `Category`,
  },
  {
    key: "brands",
    label: `Brand`,
  },
  {
    key: "products",
    label: `Product`,
  },
];

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
