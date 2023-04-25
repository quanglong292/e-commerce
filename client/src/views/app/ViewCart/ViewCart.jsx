import React from "react";
import CButton from "../../../components/core/CButton";
import useProductStore from "../../../store/product.zustand";
import { Divider } from "antd";
import fetcher from "../../../utils/helpers/fetcher";
import { REQUEST_PARAMS } from "../../../utils/constants/urlPath.constant";
import CartItem from "./elements/CartItem";

const ViewCart = () => {
  // Store
  const { ordersList } = useProductStore((state) => state);

  // Functions
  const getTotalAmount = (list) => {
    const total = list.reduce((sum, i) => sum + i.count * i.product.price, 0);

    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "USD",
    }).format(total);
  };

  const handlePayment = async () => {
    try {
      // const data = await fetcher(REQUEST_PARAMS)
    } catch (error) {
      
    }
  }

  return (
    <div className="lg:flex justify-between max-w-[940px] mx-auto gap-4">
      {/* ITEMS */}
      <div className="lg:w-2/3 mb-4">
        <p className="text-xl font-semibold text-gray-500 mb-4">BAG</p>
        {!ordersList.length ? (
          <p className="text-sm text-gray-500 font-semibold">No item found!</p>
        ) : (
          ordersList.map((i, idx) => <CartItem key={idx} item={i} />)
        )}
      </div>
      {/* PAYMENT DETAIL */}
      <div className="w-full lg:w-1/3 bg-slate-100 p-4">
        <p>PAYMENT DETAIL</p>
        <div className="font-semibold mb-4">
          Total: {getTotalAmount(ordersList)}{" "}
        </div>
        <div className="flex flex-col gap-4">
          <CButton onClick={handlePayment} type="primary">Checkout</CButton>
          <CButton type="primary">Momo</CButton>
        </div>
      </div>
    </div>
  );
};

export default ViewCart;
