import { Divider } from "antd";
import React from "react";

const CartItem = ({ item }) => {
  const { product } = item;
  return (
    <div className="w-full flex gap-4 my-8">
      <img src={product.bannerImage} alt="" className="max-w-[146px]" />
      <div className="w-full">
        <div className="flex justify-between">
          <p>{product?.name}</p>
          <p>${product?.price}</p>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-gray-500 text-sm">Size {item.id}</p>
          <Divider type="vertical" />
          <p className="text-gray-500 text-sm">
            Quantity{" "}
            <span>
              <input type="number" defaultValue={item.count} max={10} />
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
