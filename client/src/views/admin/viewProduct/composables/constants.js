import {
  BRAND_TABLE_COLUMN,
  CATEGORY_GROUP_TABLE_COLUMN,
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
    label: "Category groups",
    type: "Select",
    field: "groups",
    rules: { required: true },
    wrapClassName: "h-[70px]",
    className: "flex-col",
    mode: "multiple",
    fetchValue: REQUEST_PARAMS.GET_CATEGORY_GROUP,
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
    label: "Category Group",
    type: "Select",
    field: "group",
    rules: { required: true },
    wrapClassName: "h-[70px]",
    className: "flex-col",
    fetchValue: REQUEST_PARAMS.GET_CATEGORY_GROUP,
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
    label: "Category",
    type: "Select",
    field: "category",
    rules: { required: true },
    wrapClassName: "h-[70px]",
    className: "flex-col",
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
    label: "Brand",
    type: "Select",
    field: "brand",
    rules: { required: true },
    wrapClassName: "h-[70px]",
    className: "flex-col",
    fetchValue: REQUEST_PARAMS.GET_BRAND,
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
    label: "Stock amount",
    type: "Number",
    field: "stock.amount",
    rules: { required: true },
    wrapClassName: "h-[70px]",
    className: "flex-col",
  },
  {
    label: "Size",
    type: "Array",
    field: "size",
    rules: { required: true },
    wrapClassName: "h-[70px]",
    className: "flex-col",
  },
  {
    label: "Detail Image",
    type: "Array",
    field: "detailImages",
    rules: { required: false },
    wrapClassName: "h-[70px]",
    className: "flex-col",
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
    row: 5
  },
];

export const VIEW_SCHEMAS = {
  group: {
    viewName: "Category Group",
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
  {
    key: "brands",
    label: `Brand`,
  },
  {
    key: "products",
    label: `Product`,
  },
];
