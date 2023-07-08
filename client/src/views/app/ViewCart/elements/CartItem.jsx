import { Divider } from "antd";
import React from "react";
import { useNavigate, useResolvedPath } from "react-router-dom";
import { HeartOutlined, DeleteFilled } from "@ant-design/icons";
import useProductStore from "../../../../store/product.zustand";
import formatPrice from "../../../../utils/helpers/formatPrice";

const CartItem = ({ item }) => {
  const { product } = item;
  const { pathname } = useResolvedPath();
  const navigate = useNavigate();
  const isCheckoutStep = pathname.includes("cart-checkout");

  const { ordersList, wishList, mutateList } = useProductStore(
    (state) => state
  );

  const handleRemoveOrdersList = () => {
    if (isCheckoutStep) return navigate("/app/cart");
    const payload = ordersList.filter(
      (i) => i.product.name !== item.product.name
    );
    mutateList("ordersList", { payload });
  };

  const handleMoveToWish = () => {
    if (isCheckoutStep) return navigate("/app/cart");
    const isExist = wishList.find(
      ({ product }) => product.name === item.product.name
    );
    // console.log({ list: isExist ? wishList : [...wishList, item] });
    handleRemoveOrdersList();
    mutateList("wishList", {
      payload: isExist ? wishList : [...wishList, item],
    });
  };

  return (
    <div className="w-full flex gap-4 my-8">
      <img src={product.bannerImage} alt="" className="max-w-[146px]" />
      <div className="w-full">
        <div className="flex justify-between">
          <p>{product?.name}</p>
          <p>{formatPrice(product?.price)}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-gray-500">{product?.shortName ?? "Short name"}</p>
          <div className="flex gap-4">
            <DeleteFilled
              onClick={handleRemoveOrdersList}
              className="text-red-500 cursor-pointer"
            />
            <HeartOutlined
              onClick={handleMoveToWish}
              className="text-pink-500 cursor-pointer"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-gray-500">
            Size{" "}
            <span>
              <input
                disabled={isCheckoutStep}
                list="size"
                defaultValue={item.id}
                className="border-2 px-2"
              />
              <datalist id="size">
                {product.stocks.map((i) => {
                  if (Number(i.value))
                    return <option key={i.name} value={i.name} />;
                })}
              </datalist>
            </span>
          </p>
          <Divider type="vertical" />
          <p className="text-gray-500">
            Quantity{" "}
            <span>
              <input
                disabled={isCheckoutStep}
                type="number"
                defaultValue={item.count}
                max={Number(
                  item?.product?.stocks?.find((i) => i.name === item.id)
                    ?.value ?? 0
                )}
                min={1}
                className="border-2 px-2"
              />
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
