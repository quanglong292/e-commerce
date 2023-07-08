import {
  BRAND_TABLE_COLUMN,
  CATEGORY_GROUP_TABLE_COLUMN,
  ORDER_TABLE_COLUMN,
  PRODUCT_TABLE_COLUMN,
} from "./columns.constant";
import { REQUEST_PARAMS } from "../../../../utils/constants/urlPath.constant";

const ADD_NEW_GROUP_CATEGORY_SCHEMA = [
  {
    label: "Group name",
    type: "Text",
    field: "name",
    rules: { required: true },
    wrapClassName: "h-[70px]",
    className: "flex-col",
  },
  {
    label: "Image",
    type: "Text",
    field: "imageUrl",
    rules: { required: true },
    wrapClassName: "h-[70px]",
    className: "flex-col",
  },
];

const ADD_NEW_CATEGORY_SCHEMA = [
  {
    label: "Name",
    type: "Text",
    field: "name",
    rules: { required: true },
    wrapClassName: "h-[70px]",
    className: "flex-col",
  },
  {
    label: "Groups",
    type: "Select",
    field: "groups",
    rules: { required: true },
    wrapClassName: "h-[70px]",
    className: "flex-col",
    mode: "multiple",
    fetchValue: REQUEST_PARAMS.GET_CATEGORY_GROUP,
    options: [
      {
        value: "null",
        label: "null",
      },
    ],
  },
  {
    label: "Description",
    type: "TextArea",
    field: "description",
    rules: { required: true },
    wrapClassName: "h-[70px]",
    className: "flex-col",
  },
];

const ADD_NEW_BRAND_SCHEMA = [
  {
    label: "Name",
    type: "Text",
    field: "name",
    rules: { required: true },
    wrapClassName: "h-[70px]",
    className: "flex-col",
  },
  {
    label: "Categories",
    type: "Select",
    field: "categories",
    rules: { required: true },
    wrapClassName: "h-[70px]",
    className: "flex-col",
    mode: "multiple",
    fetchValue: REQUEST_PARAMS.GET_CATEGORY,
    options: [
      {
        value: "jack",
        label: "Jack",
      },
      {
        value: "lucy",
        label: "Lucy",
      },
      {
        value: "Yiminghe",
        label: "yiminghe",
      },
      {
        value: "disabled",
        label: "Disabled",
      },
    ],
  },
  {
    label: "Image URL",
    type: "Text",
    field: "image",
    placeHolder: "https://...",
    rules: { required: true },
    wrapClassName: "h-[70px]",
    className: "flex-col",
  },
  {
    label: "Description",
    type: "TextArea",
    field: "description",
    rules: { required: false },
    wrapClassName: "h-[70px]",
    className: "flex-col",
  },
];

const ADD_NEW_PRODUCT_SCHEMA = [
  "grid grid-cols-3 gap-2 mb-4",
  {
    label: "Name",
    type: "Text",
    field: "name",
    rules: { required: true },
    wrapClassName: "h-[70px]",
    className: "flex-col",
  },
  {
    label: "Short Name",
    type: "Text",
    field: "shortName",
    rules: { required: false },
    wrapClassName: "h-[70px]",
    className: "flex-col",
  },
  {
    label: "Category",
    type: "Select",
    field: "category",
    rules: { required: true },
    wrapClassName: "h-[70px]",
    className: "flex-col",
    mode: "multiple",
    fetchValue: REQUEST_PARAMS.GET_CATEGORY,
    options: [
      {
        value: "jack",
        label: "Jack",
      },
      {
        value: "lucy",
        label: "Lucy",
      },
      {
        value: "Yiminghe",
        label: "yiminghe",
      },
      {
        value: "disabled",
        label: "Disabled",
      },
    ],
  },
  {
    label: "Price",
    type: "Number",
    field: "price",
    rules: { required: true },
    wrapClassName: "h-[70px]",
    className: "flex-col",
  },
  {
    label: "Define Stock",
    type: "Array",
    field: "stocks",
    rules: { required: true },
    wrapClassName: "h-[70px]",
    className: "flex-col",
    defaultValues: [{ name: "", value: "" }],
    arrayFields: [
      {
        label: "Stock name",
        field: "name",
        placeholder: "stock name",
      },
      {
        label: "Amount",
        field: "value",
        placeholder: "stock amount",
      },
    ],
  },
  {
    label: "Detail Image",
    type: "Array",
    field: "detailImages",
    rules: { required: true },
    wrapClassName: "h-[70px]",
    className: "flex-col",
    defaultValues: [{ value: "" }],
    arrayFields: [
      {
        label: "URL",
        field: "value",
        placeholder: "url",
      },
    ],
  },
  {
    label: "Banner Image",
    type: "Text",
    field: "bannerImage",
    rules: { required: true },
    wrapClassName: "h-[70px]",
    className: "flex-col",
  },
  {
    label: "Description",
    type: "TextArea",
    field: "description",
    rules: { required: false },
    wrapClassName: "h-[70px] w-full",
    className: "flex-col",
    row: 5,
  },
];

export const VIEW_SCHEMAS = {
  group: {
    viewName: "Category Group",
    sortTable: true,
    schemas: {
      columns: CATEGORY_GROUP_TABLE_COLUMN,
      formSchema: ADD_NEW_GROUP_CATEGORY_SCHEMA,
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
      formSchema: ADD_NEW_CATEGORY_SCHEMA,
      requets: {
        GET_TABLE_ITEMS: REQUEST_PARAMS.GET_CATEGORY,
        ADD_TABLE_ITEM: REQUEST_PARAMS.ADD_CATEGORY,
        DELETE_TABLE_ITEM: REQUEST_PARAMS.DELETE_CATEGORY,
      },
    },
  },
  brands: {
    viewName: "brands",
    schemas: {
      columns: BRAND_TABLE_COLUMN,
      formSchema: ADD_NEW_BRAND_SCHEMA,
      requets: {
        GET_TABLE_ITEMS: REQUEST_PARAMS.GET_BRAND,
        ADD_TABLE_ITEM: REQUEST_PARAMS.ADD_BRAND,
        DELETE_TABLE_ITEM: REQUEST_PARAMS.DELETE_BRAND,
      },
    },
  },
  products: {
    viewName: "products",
    schemas: {
      columns: PRODUCT_TABLE_COLUMN,
      formSchema: ADD_NEW_PRODUCT_SCHEMA,
      requets: {
        GET_TABLE_ITEMS: REQUEST_PARAMS.GET_PRODUCT,
        ADD_TABLE_ITEM: REQUEST_PARAMS.ADD_PRODUCT,
        DELETE_TABLE_ITEM: REQUEST_PARAMS.DELETE_PRODUCT,
      },
    },
  },
  user: {
    viewName: "user",
    schemas: {
      columns: [
        {
          title: "Username",
          dataIndex: "userName",
          key: "userName",
        },
      ],
      formSchema: [
        "grid grid-cols-3 gap-2 mb-4",
        {
          label: "Username",
          type: "Text",
          field: "userName",
          rules: { required: true },
          wrapClassName: "h-[70px]",
          className: "flex-col",
        },
        {
          label: "Password",
          type: "Text",
          field: "password",
          rules: { required: true },
          wrapClassName: "h-[70px]",
          className: "flex-col",
        },
        {
          label: "Mail",
          type: "Text",
          field: "info.mail",
          rules: { required: false },
          wrapClassName: "h-[70px]",
          className: "flex-col",
        },
      ],
      requets: {
        GET_TABLE_ITEMS: REQUEST_PARAMS.GET_USER,
        ADD_TABLE_ITEM: REQUEST_PARAMS.ADD_USER,
        DELETE_TABLE_ITEM: REQUEST_PARAMS.DELETE_USER,
      },
    },
  },
  orders: {
    viewName: "orders",
    schemas: {
      columns: ORDER_TABLE_COLUMN,
      formSchema: [
        "grid grid-cols-3 gap-2 mb-4",
        {
          label: "Username",
          type: "Text",
          field: "userName",
          rules: { required: true },
          wrapClassName: "h-[70px]",
          className: "flex-col",
        },
      ],
      requets: {
        GET_TABLE_ITEMS: REQUEST_PARAMS.GET_CART,
        ADD_TABLE_ITEM: REQUEST_PARAMS.ADD_CART,
        DELETE_TABLE_ITEM: REQUEST_PARAMS.DELETE_CART,
      },
    },
  },
};

export const tabItems = [
  {
    key: "group",
    label: `Category Group`,
  },
  {
    key: "categories",
    label: `Category`,
  },
  // {
  //   key: "brands",
  //   label: `Brand`,
  // },
  {
    key: "products",
    label: `Product`,
  },
  // {
  //   key: "user",
  //   label: `User`,
  // },
  // {
  //   key: "orders",
  //   label: `Orders`,
  // },
];

export const SINGLE_MANAGEMENT_VIEWS = ["/user", "/orders"] 
