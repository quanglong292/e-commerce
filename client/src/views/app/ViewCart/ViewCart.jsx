import React, { useState } from "react";
import CButton from "../../../components/core/CButton";
import useProductStore from "../../../store/product.zustand";
import useGlobalStore from "../../../store/global.zustand";
import { Modal } from "antd";
import CartItem from "./elements/CartItem";
import useCart from "../../../utils/composables/useCart";
import CreditForm from "./elements/CreditForm";

const ViewCart = () => {
  // Store
  const { ordersList } = useProductStore((state) => state);
  const { token, user } = useGlobalStore((state) => state);

  // States
  const [openPayment, setOpenPayment] = useState(false);

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
      <div className="w-full lg:w-1/3 bg-gray-200 p-4">
        <p>PAYMENT DETAIL</p>
        <div className="font-semibold mb-4">
          Total: {amounts?.currencyPrice}
        </div>
        <CButton onClick={() => setOpenPayment(true)} type="black">
          Checkout
        </CButton>
      </div>

      {/* MODAL PAYMENT */}
      <Modal
        width={"50%"}
        footer={<></>}
        title={"Log payment"}
        open={openPayment}
        onCancel={() => setOpenPayment(false)}
      >
        <CreditForm
          onSubmit={(e) => {
            console.log({ submit: e });
          }}
        />
      </Modal>
    </div>
  );
};

export default ViewCart;
