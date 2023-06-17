import { AppstoreOutlined, SettingOutlined } from "@ant-design/icons";

export const FILTER_OPTIONS = {
  search: "name",
  category: "category",
  categoryGroup: "group",
  brand: "brand",
  sortBy: "sortBy",
};

export const ACCOUNT_LOGIN_OPTION = {
  label: "Login",
  path: "",
};

export const ACCOUNT_OPTIONS = [
  {
    label: "Detail",
    path: "app/user/detail",
  },
  {
    label: "Log out",
    path: "",
  },
];

export const SIDE_BAR_ITEMS = [
  {
    label: "Dashboard",
    path: "",
    key: "",
    icon: <AppstoreOutlined />,
  },
  {
    label: "Sale",
    path: "sale",
    key: "sale",
    icon: <AppstoreOutlined />,
  },
  {
    label: "Product",
    path: "product",
    key: "product",
    icon: <SettingOutlined />,
  },
];
