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
    label: "Setting",
    shortLabel: "Setting",
    path: "",
    key: "",
    icon: <SettingOutlined />,
  },
  {
    label: "Sale Management",
    shortLabel: "Sale",
    path: "sale",
    key: "sale",
    icon: <AppstoreOutlined />,
  },
  {
    label: "User Management",
    shortLabel: "User",
    path: "user",
    key: "user",
    icon: <AppstoreOutlined />,
  },
  {
    label: "Order Management",
    shortLabel: "Order",
    path: "orders",
    key: "orders",
    icon: <AppstoreOutlined />,
  },
  {
    label: "Category Management",
    shortLabel: "Category",
    path: "category",
    key: "category",
    icon: <AppstoreOutlined />,
  },
];
