import React, { useState } from "react";
import CButton from "../../../components/core/CButton";
import useProductStore from "../../../store/product.zustand";
import useGlobalStore from "../../../store/global.zustand";
import { Modal } from "antd";
import CartItem from "./elements/CartItem";
import useCart from "../../../utils/composables/useCart";
import CreditForm from "./elements/CreditForm";
import WishList from "./elements/WishList";
import SectionHeader from "../ViewProducts/elements/ViewLanding/elements/SectionHeader";

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
    <>
      <div className="mx-auto">
        <div className="lg:flex justify-between gap-4 pb-24 border-b-2">
          {/* ITEMS */}
          <div className="lg:w-2/3 mb-4">
            <SectionHeader>BAG</SectionHeader>
            {!ordersList.length ? (
              <p className="text-sm text-gray-500 font-semibold">
                No item found!
              </p>
            ) : (
              ordersList.map((i, idx) => <CartItem key={idx} item={i} />)
            )}
          </div>
          {/* PAYMENT DETAIL */}
          <div className="w-full lg:w-1/3 p-4">
            <SectionHeader>PAYMENT DETAIL</SectionHeader>
            <div className="flex items-start justify-between pb-2 border-b-2 border-black mb-4 text-lg">
              <section className="w-1/2">Total</section>
              <section className="w-1/2 text-right">
                {amounts?.currencyPrice}
              </section>
            </div>
            <div className="flex items-start justify-between pb-2 border-b-2 border-black mb-4 text-lg">
              <section className="w-1/2">Subtotal</section>
              <section className="w-1/2 text-right">-</section>
            </div>
            <div className="flex items-start justify-between pb-2 border-b-2 border-black text-lg mb-9">
              <section className="w-1/2">Estimated Delivery & Handling</section>
              <section className="w-1/2 text-right">Free</section>
            </div>
            <CButton onClick={() => setOpenPayment(true)} type="black">
              Checkout
            </CButton>
          </div>
        </div>

        <WishList />
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
          onSubmit={() => {
            handlePayment();
          }}
        />
      </Modal>
    </>
  );
};

export default ViewCart;
