import React from "react";
import CButton from "../../../components/core/CButton";
import useProductStore from "../../../store/product.zustand";
import useGlobalStore from "../../../store/global.zustand";
import { Popconfirm } from "antd";
import CartItem from "./elements/CartItem";
import useCart from "../../../utils/composables/useCart";

const ViewCart = () => {
  // Store
  const { ordersList } = useProductStore((state) => state);
  const { token, user } = useGlobalStore((state) => state);

  // Functions
  const { amounts, createPayment } = useCart(ordersList, {
    user,
    token,
  });

  const handlePayment = async () => {
    await createPayment();
  };

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
          Total: {amounts?.currencyPrice}
        </div>
        <div className="flex flex-col gap-4">
          <Popconfirm title="Confirm to order ?" onConfirm={handlePayment}>
            <CButton type="primary">Checkout</CButton>
          </Popconfirm>
          <CButton type="primary">Momo</CButton>
        </div>
      </div>
    </div>
  );
};

export default ViewCart;
