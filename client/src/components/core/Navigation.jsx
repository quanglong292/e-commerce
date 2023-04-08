import { Badge, Button, Dropdown, Input } from "antd";
import { ShoppingCartOutlined, HeartOutlined } from "@ant-design/icons";
import React, { useContext, useEffect, useMemo, useReducer } from "react";
import Logo from "../../assets/icons/Logo";
import {
  APP_NAVIGATIONS,
  SIDE_BAR_ITEMS,
} from "../../utils/constants/sidebar.constant";
import { useNavigate, useResolvedPath } from "react-router-dom";
import CButton from "./CButton";
import { useStore } from "../../store";

const { Search } = Input;

const AppNavigateButton = () => {
  const navigate = useNavigate();

  return (
    <div className="w-[25%] flex justify-end">
      <Dropdown
        menu={{
          items: [
            {
              label: <div onClick={() => navigate("/app")}>Distribution</div>,
              key: "0",
            },
            {
              label: <div onClick={() => navigate("/crm/")}>CRM</div>,
              key: "1",
            },
            {
              label: <div onClick={() => navigate("/")}>Admin</div>,
              key: "2",
            },
          ],
        }}
        trigger={["click"]}
        placement="bottomRight"
      >
        <CButton type="primary">Apps</CButton>
      </Dropdown>
    </div>
  );
};

const Navigation = () => {
  const navigate = useNavigate();
  const { pathname } = useResolvedPath();

  // Store
  const { storeState, dispatch } = useStore();

  // Memo data
  const isClientApp = useMemo(() => pathname.includes("app"), [pathname]);
  const SCHEMA = useMemo(() => {
    return !isClientApp ? SIDE_BAR_ITEMS : APP_NAVIGATIONS;
  }, [pathname]);

  // Functions
  const reduceListCount = (list = []) =>
    list.reduce((sum, i) => (sum += i.count), 0);

  const AdditionNavs = () => {
    if (!isClientApp) return <AppNavigateButton />;

    function onSearch(e) {
      console.log("🚀 ~ file: Navigation.jsx:17 ~ onSearch ~ e:", e);
    }

    return (
      <div className="flex gap-2 w-[25%] justify-end">
        <Search
          placeholder="Search"
          onSearch={onSearch}
          style={{ width: 200 }}
        />
        <Dropdown
          menu={{
            items: storeState?.wishList.map((i) => ({
              label: (
                <div className="flex items-center gap-4">
                  <div className="flex">
                    <p className="font-semibold">Air Jordan 1 - Size: {i.id}</p>
                  </div>
                  <div className="flex text-xs">
                    <CButton danger>X</CButton>
                  </div>
                </div>
              ),
              key: i.id,
            })),
          }}
          placement="bottomRight"
        >
          <Badge count={reduceListCount(storeState?.wishList)}>
            <Button shape="circle" icon={<HeartOutlined />} />
          </Badge>
        </Dropdown>
        <Badge count={reduceListCount(storeState?.ordersList)}>
          <Button
            onClick={() => {
              navigate("/app/cart")
            }}
            shape="circle"
            icon={<ShoppingCartOutlined />}
          />
        </Badge>
        <AppNavigateButton />
      </div>
    );
  };

  return (
    <div className="w-full h-[56px] shadow-md bg-white mb-2 px-4 py-2 flex justify-between items-center">
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
