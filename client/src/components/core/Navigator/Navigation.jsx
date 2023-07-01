import { Divider, Dropdown } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import React, { useEffect, useMemo } from "react";
import Logo from "../../../assets/icons/Logo";
import { APP_NAVIGATIONS } from "../../../utils/constants/sidebar.constant";
import { NavLink, useNavigate, useResolvedPath } from "react-router-dom";
import CButton from "../CButton";
import useProductStore from "../../../store/product.zustand";
import {
  FILTER_OPTIONS,
  SIDE_BAR_ITEMS,
} from "../../../utils/constants/navigation.constant";
import AdditionNav from "./elements/AdditionNav";
import AppsNavigator from "./elements/AppsNavigator";
import MobileNav from "./elements/MobileNav";
import MainNav from "./elements/MainNav";

const Navigation = () => {
  const navigate = useNavigate();
  const { pathname } = useResolvedPath();

  // Store
  const {
    wishList,
    setFilter,
    ordersList,
    categoryGroups,
    fetchInitData,
    fetch,
  } = useProductStore((state) => state);

  // Memo data
  const isClientApp = useMemo(() => pathname.includes("app"), [pathname]);
  const SCHEMA = useMemo(() => {
    return !isClientApp
      ? SIDE_BAR_ITEMS
      : [
          APP_NAVIGATIONS[0],
          ...categoryGroups
            ?.sort((a, b) => Number(a.key) - Number(b.key))
            ?.map((i) => ({
              ...i,
              label: i.name,
              path: `app/${i.name.toLowerCase()}`,
            })),
        ];
  }, [pathname, categoryGroups]);

  // Functions

  const navChangeActions = (path) => {
    path = path.split("/")[2];

    if (!path) return fetch("all");

    const value = categoryGroups?.find(
      (i) => i.name.toLowerCase() === path
    )?.id;

    if (!value) return;

    setFilter(FILTER_OPTIONS.categoryGroup, value);
  };

  // Effects
  useEffect(() => {
    fetchInitData();
  }, []);

  useEffect(() => {
    navChangeActions(pathname);
  }, [pathname, SCHEMA]);

  return (
    <div className="w-full">
      <AdditionNav isClientApp={isClientApp} />
      <MainNav schema={SCHEMA} />
    </div>
  );
};

export default Navigation;
