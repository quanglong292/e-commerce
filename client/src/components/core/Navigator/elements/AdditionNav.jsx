import React from "react";
import useProductStore from "../../../../store/product.zustand";
import useGlobalStore from "../../../../store/global.zustand";
import sumAmount from "../../../../utils/helpers/sumAmount";
import { Badge, Button, Dropdown } from "antd";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  UserOutlined,
  ShopFilled,
} from "@ant-design/icons";
import AppsNavigator from "./AppsNavigator";
import CButton from "../../CButton";
import {
  ACCOUNT_LOGIN_OPTION,
  ACCOUNT_OPTIONS,
} from "../../../../utils/constants/navigation.constant";
import { useNavigate } from "react-router-dom";

const AdditionNav = (props) => {
  const { isClientApp } = props;
  const navigate = useNavigate();
  // Store
  const {
    wishList,
    setFilter,
    ordersList,
    categoryGroups,
    fetchInitData,
    fetch,
  } = useProductStore((state) => state);
  const { token, toggleLoginModal, handleLogout } = useGlobalStore(
    (state) => state
  );
  if (!isClientApp)
    return (
      <div className="w-full flex justify-end bg-[#313131] p-1 px-4">
        <AppsNavigator className="hidden lg:flex" />;
      </div>
    );

  function onSearch(e) {}

  return (
    <div className="w-full flex justify-end bg-[#313131] p-1">
      <div className="hidden lg:flex gap-4 w-[25%] justify-end items-center">
        <Dropdown
          menu={{
            items: wishList.map((i) => ({
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
          <Badge count={sumAmount(wishList)}>
            <div className="font-semibold text-[#a1a1a1] hover:underline cursor-pointer text-sm">
              WISH
            </div>
          </Badge>
        </Dropdown>
        <Badge count={sumAmount(ordersList)}>
          <div
            onClick={() => {
              navigate("/app/cart");
            }}
            className="font-semibold text-[#a1a1a1] hover:underline cursor-pointer text-sm"
          >
            CART
          </div>
        </Badge>
        <Dropdown
          menu={{
            items: (!token ? [ACCOUNT_LOGIN_OPTION] : ACCOUNT_OPTIONS).map(
              (i) => ({
                label: (
                  <p
                    onClick={() => {
                      if (i.label === "Login") {
                        navigate("auth/app");
                      } else if (i.label === "Log out") handleLogout();
                      else navigate(i.path);
                    }}
                  >
                    {i.label}
                  </p>
                ),
                key: i.id,
              })
            ),
          }}
          placement="bottomRight"
        >
          <div className="font-semibold text-[#a1a1a1] hover:underline cursor-pointer text-sm">
            ACCOUNT
          </div>
        </Dropdown>
        <AppsNavigator />
      </div>
    </div>
  );
};

export default AdditionNav;
