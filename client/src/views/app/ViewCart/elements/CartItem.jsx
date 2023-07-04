import { Divider } from "antd";
import React from "react";
import { useResolvedPath } from "react-router-dom";

const CartItem = ({ item }) => {
  const { product } = item;
  const { pathname } = useResolvedPath();
  const isCheckoutStep = pathname.includes("cart-checkout");
  return (
    <div className="w-full flex gap-4 my-8">
      <img src={product.bannerImage} alt="" className="max-w-[146px]" />
      <div className="w-full">
        <div className="flex justify-between">
          <p>{product?.name}</p>
          <p>${product?.price}</p>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-gray-500 text-sm">
            Size{" "}
            <span>
              <input
                disabled={isCheckoutStep}
                list="size"
                defaultValue={item.id}
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
          <p className="text-gray-500 text-sm">
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
              />
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
