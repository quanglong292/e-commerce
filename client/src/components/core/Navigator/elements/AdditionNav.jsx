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
  const { wishList, ordersList, mutateList } = useProductStore(
    (state) => state
  );
  const { user, token, handleLogout } = useGlobalStore((state) => state);
  if (!isClientApp)
    return (
      <div className="w-full flex justify-end bg-[#313131] p-1 px-4">
        <AppsNavigator className="hidden lg:flex" />;
      </div>
    );

  // Functions
  function onSearch(e) {}
  const handleRemoveWishList = (item) => {
    const payload = wishList.filter(
      (i) => i.product.name !== item.product.name
    );
    mutateList("wishList", { payload });
  };

  const handleBuyWishItem = (item) => {
    mutateList("ordersList", {
      payload: [item],
    });
    handleRemoveWishList(item);
  };

  return (
    <div className="w-full flex justify-end bg-[#313131] p-1">
      <div className="hidden lg:flex gap-4 w-[25%] justify-end items-center px-24 py-2">
        {/* <Dropdown
          menu={{
            items: wishList.map((i) => ({
              label: (
                <div className="flex items-center gap-4">
                  <div className="flex">
                    <p className="font-semibold">
                      {i.product.name} - <span className="font-bold">Size</span>
                      : {i.id}*{i.count}
                    </p>
                  </div>
                  <div className="flex text-xs gap-2">
                    <CButton
                      success
                      onClick={() => handleBuyWishItem(i)}
                      size="small"
                    >
                      Buy
                    </CButton>
                    <CButton
                      onClick={() => handleRemoveWishList(i)}
                      danger
                      size="small"
                    >
                      X
                    </CButton>
                  </div>
                </div>
              ),
              key: i.id,
            })),
          }}
          placement="bottomRight"
        >
          <Badge count={wishList?.length}>
            <div className="font-semibold text-[#a1a1a1] hover:underline cursor-pointer text-sm">
              WISH
            </div>
          </Badge>
        </Dropdown> */}
        <Badge count={wishList?.length}>
          <div
            onClick={() => navigate("/app/wish-list")}
            className="font-semibold text-[#a1a1a1] hover:underline cursor-pointer text-sm"
          >
            WISH
          </div>
        </Badge>
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
                      } else if (i.label === "Log out") {
                        handleLogout();
                        location.reload();
                      } else navigate(i.path);
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
        {!user ? (
          <AppsNavigator />
        ) : user?.permission === "admin" ? (
          <AppsNavigator />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default AdditionNav;
