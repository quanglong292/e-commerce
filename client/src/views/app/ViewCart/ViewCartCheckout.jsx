import React, { useEffect, useState } from "react";
import AddressForm from "../../../components/core/AddressForm";
import AddressSelectBox from "../../../components/layout/AddressSelectBox";
import SectionHeader from "../ViewProducts/elements/ViewLanding/elements/SectionHeader";
import useProductStore from "../../../store/product.zustand";
import CartItem from "./elements/CartItem";
import CButton from "../../../components/core/CButton";
import useCart from "../../../utils/composables/useCart";
import useGlobalStore from "../../../store/global.zustand";
import CreditForm from "./elements/CreditForm";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";

const ViewCartCheckout = () => {
  const navigate = useNavigate();
  // Stores
  const { ordersList, checkoutInfo } = useProductStore((state) => state);
  const { token, user } = useGlobalStore((state) => state);

  // State
  const [currentStep, setCurrentStep] = useState(0);

  // Functions
  const { amounts, createPayment } = useCart(ordersList, {
    user,
    token,
  });

  const handlePayment = async () => {
    const data = await createPayment();
    if (data) {
      mutateList("ordersList", { payload: [] });
      navigate("/app/user/detail");
    }
  };

  useEffect(() => {
    if (!ordersList.length) navigate(-1);
  }, []);

  return (
    <div className="flex gap-8">
      <div className="w-1/2">
        {!currentStep ? (
          <AddressStep user={user} setCurrentStep={setCurrentStep} />
        ) : (
          <PaymentStep
            setCurrentStep={setCurrentStep}
            handlePayment={handlePayment}
          />
        )}
      </div>
      <div className="max-w-1/2">
        <div className="w-full">
          <SectionHeader>SUMMARY</SectionHeader>
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
          <div className="pb-2 border-b-2 border-black text-lg mb-9">
            <section className="w-1/2">Paypal</section>
          </div>
          {/* {!paymentForm ? (
            <CButton
              onClick={() => {
                // setOpenPayment(true)
                navigate("/app/cart-checkout");
              }}
              type="black"
            >
              Checkout
            </CButton>
          ) : (
            <PayPalButtons
              ref={paypalRef}
              onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                  const name = details.payer.name.given_name;
                  alert(`Transaction completed by ${name}`);
                  handlePayment();
                });
              }}
              style={{ layout: "horizontal" }}
            />
          )} */}
        </div>
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
      </div>
    </div>
  );
};

function AddressStep({ setCurrentStep }) {
  const { checkoutInfo, mutateData } = useProductStore((state) => state);
  const { address } = useGlobalStore((state) => state);

  const handleSelectAddress = (address) => {
    const updateAddress = { ...checkoutInfo, address };
    mutateData("checkoutInfo", updateAddress);
  };

  useEffect(() => {
    return () => {
      handleSelectAddress(null);
    };
  }, []);

  return (
    <div className="w-full">
      <SectionHeader>how you will receive ?</SectionHeader>
      <AddressSelectBox onSelect={handleSelectAddress} items={address} />
      <AddressForm
        isRequired={!Boolean(checkoutInfo?.address)}
        onSubmit={(e) => {
          if (e.paymentMethod === "paypal") {
            setCurrentStep(1);
          }
        }}
      />
    </div>
  );
}

function PaymentStep({ setCurrentStep, handlePayment }) {
  return (
    <>
      <SectionHeader>give me your card</SectionHeader>
      <div className="w-full flex flex-col items-center justify-center gap-4">
        <CreditForm onSubmit={(formValue) => handlePayment()} />
        {/* <div className="w-full h-full flex items-center justify-center py-4"> */}
        <PayPalButtons
          onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
              const name = details.payer.name.given_name;
              alert(`Transaction completed by ${name}`);
              handlePayment();
            });
          }}
          style={{ layout: "horizontal" }}
        />
        {/* </div> */}
      </div>
    </>
  );
}

export default ViewCartCheckout;
