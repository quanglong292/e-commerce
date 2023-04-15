import { Badge, Button, Divider, Dropdown, Input } from "antd";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  SearchOutlined,
  MenuOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React, { useContext, useEffect, useMemo, useReducer } from "react";
import Logo from "../../assets/icons/Logo";
import {
  APP_NAVIGATIONS,
  SIDE_BAR_ITEMS,
} from "../../utils/constants/sidebar.constant";
import { NavLink, useNavigate, useResolvedPath } from "react-router-dom";
import CButton from "./CButton";
import useProductStore from "../../store/product.zustand";

const { Search } = Input;

const AppNavigateButton = (props) => {
  const { className } = props;
  const navigate = useNavigate();

  return (
    <div className={"w-[25%] justify-end " + className}>
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
  const productStore = useProductStore(state => state)

  // Memo data
  const isClientApp = useMemo(() => pathname.includes("app"), [pathname]);
  const SCHEMA = useMemo(() => {
    return !isClientApp ? SIDE_BAR_ITEMS : APP_NAVIGATIONS;
  }, [pathname]);

  // Functions
  const reduceListCount = (list = []) =>
    list.reduce((sum, i) => (sum += i.count), 0);

  const AdditionNavs = () => {
    if (!isClientApp) return <AppNavigateButton className="hidden lg:flex" />;

    function onSearch(e) {
    }

    return (
      <div className="hidden lg:flex gap-2 w-[25%] justify-end">
        <Dropdown
          menu={{
            items: productStore?.wishList.map((i) => ({
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
          <Badge count={reduceListCount(productStore?.wishList)}>
            <Button shape="circle" icon={<HeartOutlined />} />
          </Badge>
        </Dropdown>
        <Badge count={reduceListCount(productStore?.ordersList)}>
          <Button
            onClick={() => {
              navigate("/app/cart");
            }}
            shape="circle"
            icon={<ShoppingCartOutlined />}
          />
        </Badge>
        <Dropdown
          menu={{
            items: [
              {
                label: "Detail",
                path: "app/user/detail",
              },
              {
                label: "Log out",
                path: "",
              },
            ].map((i) => ({
              label: <NavLink to={`${i.path}`}>{i.label}</NavLink>,
              key: i.id,
            })),
          }}
          placement="bottomRight"
        >
          <Button shape="circle" icon={<UserOutlined />} />
        </Dropdown>
        <AppNavigateButton />
      </div>
    );
  };

  return (
    <div className="w-full h-[56px] shadow-md bg-white mb-2 px-4 py-2 flex justify-between items-center">
      <div className="cursor-pointer w-[25%]" onClick={() => navigate("/")}>
        <Logo />
      </div>
      <div className="hidden lg:flex gap-4 items-center">
        {SCHEMA.map((i) => (
          <NavLink
            key={i.key}
            to={`${i.path}`}
            className={({ isActive, isPending }) =>
              isActive
                ? "text-blue-400 cursor-pointer text-sm ease-out duration-300 border-b-2 border-blue-400"
                : isPending
                ? "hover:text-blue-400 cursor-pointer text-sm ease-out duration-300"
                : "hover:text-blue-400 cursor-pointer text-sm ease-out duration-300"
            }
          >
            {i.label}
          </NavLink>
        ))}
      </div>
      <AdditionNavs isClientApp={isClientApp} />

      {/* MOBILE */}
      <div className="lg:hidden flex items-center justify-between gap-4">
        <Dropdown
          menu={{
            items: [
              ...SCHEMA.map((i) => ({
                label: (
                  <NavLink to={`${i.path}`} className="w-full">
                    {i.label}
                  </NavLink>
                ),
                key: i.key,
              })),
              ...[
                {
                  label: <Divider />,
                  key: "a1",
                },
                {
                  label: <CButton className="w-full">Wish list</CButton>,
                  key: "a2",
                },
                {
                  label: (
                    <CButton
                      onClick={() => navigate("app/cart")}
                      className="w-full"
                    >
                      Cart
                    </CButton>
                  ),
                  key: "a3",
                },
                {
                  label: <CButton onClick={() => navigate("app/user/detail")} className="w-full">User</CButton>,
                  key: "a4",
                },
              ],
            ],
          }}
          trigger={["click"]}
          placement="bottomRight"
        >
          <CButton icon={<MenuOutlined />}></CButton>
        </Dropdown>
        <AppNavigateButton />
      </div>
    </div>
  );
};

export default Navigation;
