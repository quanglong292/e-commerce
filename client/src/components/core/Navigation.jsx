import { Button, Input } from "antd";
import { ShoppingCartOutlined, HeartOutlined } from "@ant-design/icons";
import React, { useMemo } from "react";
import { MenuOutlined } from "@ant-design/icons";
import Logo from "../../assets/icons/Logo";
import {
  APP_NAVIGATIONS,
  SIDE_BAR_ITEMS,
} from "../../utils/constants/sidebar.constant";
import { useNavigate, useResolvedPath } from "react-router-dom";

const { Search } = Input;

const AdditionNavs = (props) => {
  const { isClientApp } = props;
  console.log(
    "🚀 ~ file: Navigation.jsx:16 ~ AdditionNavs ~ isClientApp:",
    isClientApp
  );

  if (!isClientApp) return <></>;

  function onSearch(e) {
    console.log("🚀 ~ file: Navigation.jsx:17 ~ onSearch ~ e:", e);
  }

  return (
    <div className="flex gap-2 w-[25%] justify-end">
      <Search placeholder="Search" onSearch={onSearch} style={{ width: 200 }} />
      <Button shape="circle" icon={<HeartOutlined />} />
      <Button shape="circle" icon={<ShoppingCartOutlined />} />
    </div>
  );
};

const Navigation = () => {
  const navigate = useNavigate();
  const { pathname } = useResolvedPath();
  console.log(
    "🚀 ~ file: Navigation.jsx:36 ~ Navigation ~ pathname:",
    pathname
  );
  const isClientApp = useMemo(() => pathname.includes("app"), [pathname]);
  const SCHEMA = useMemo(() => {
    return !isClientApp ? SIDE_BAR_ITEMS : APP_NAVIGATIONS;
  }, [pathname]);

  return (
    <div className="w-full h-[44px] shadow-md bg-white mb-2 px-4 py-2 flex justify-between items-center">
      <div className="cursor-pointer w-[25%]" onClick={() => navigate("/")}>
        <Logo />
      </div>
      <div className="flex gap-4 items-center">
        {SCHEMA.map((i) => (
          <div
            key={i.key}
            onClick={() => navigate(i.path)}
            className="hover:text-blue-400 cursor-pointer text-sm ease-out duration-300"
          >
            {i.label}
          </div>
        ))}
      </div>
      <AdditionNavs isClientApp={isClientApp} />
    </div>
  );
};

export default Navigation;
