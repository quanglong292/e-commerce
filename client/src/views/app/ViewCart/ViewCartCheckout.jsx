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
import CTooltip from "../../../components/core/CTooltip";
import CInput from "../../../components/core/CInput";
import { Radio } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import FreeDelivery from "./elements/FreeDelivery";

const ViewCartCheckout = () => {
  const navigate = useNavigate();
  // Stores
  const { ordersList, mutateList, checkoutInfo } = useProductStore(
    (state) => state
  );
  const { token, user } = useGlobalStore((state) => state);

  // State
  const [currentStep, setCurrentStep] = useState(0);

  // Functions
  const { amounts, createPayment } = useCart(ordersList, {
    user,
    checkoutInfo,
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
            <section className="w-1/2">Subtotal</section>
            <section className="w-1/2 text-right">-</section>
          </div>
          <div className="flex items-start justify-between pb-2 border-b-2 border-black text-lg mb-9">
            <section className="w-1/2">Estimated Delivery & Handling</section>
            <section className="w-1/2 text-right">Free</section>
          </div>
          <div className="flex items-start justify-between pb-2 border-b-2 border-black mb-4 text-lg">
            <section className="w-1/2">Total</section>
            <section className="w-1/2 text-right flex justify-end items-center gap-1">
              {amounts?.currencyPrice}
              <CTooltip text="Sẽ được trả giá nếu là khách sỉ" />
            </section>
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
  const navigate = useNavigate();
  const { checkoutInfo, mutateData } = useProductStore((state) => state);
  const { address } = useGlobalStore((state) => state);

  const handleSelectAddress = (address) => {
    const updateAddress = { ...checkoutInfo, address };
    mutateData("checkoutInfo", updateAddress);
  };

  // useEffect(() => {
  //   return () => {
  //     // handleSelectAddress(null);
  //   };
  // }, []);

  return (
    <div className="w-full">
      <FreeDelivery />
      <div className="flex justify-between items-center">
        <SectionHeader>Information</SectionHeader>
        <div className="w-fit">
          <CButton
            onClick={() => navigate("/app/cart")}
            type="black"
            className="px-4 text-sm rounded-xl flex items-center gap-4"
          >
            <ArrowLeftOutlined />
            <span>Back</span>
          </CButton>
        </div>
      </div>
      <div className="flex items-start gap-4 text-lg mb-8 mt-8">
        <p className="text-lg uppercase">You are whole sale ?</p>
        <Radio.Group
          options={[
            { label: "Yes", value: true },
            { label: "No", value: false },
          ]}
          onChange={({ target }) => {
            mutateData("checkoutInfo", {
              ...checkoutInfo,
              isWholeSale: target.value,
            });
          }}
          // value={value4}
          optionType="button"
          buttonStyle="solid"
        />
      </div>
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
      <FreeDelivery />
      <div className="flex justify-between items-center">
        <SectionHeader>give me your card</SectionHeader>
        <div className="w-fit">
          <CButton
            onClick={() => setCurrentStep(0)}
            type="black"
            className="px-4 text-sm rounded-xl flex items-center gap-4"
          >
            <ArrowLeftOutlined />
            <span>Back</span>
          </CButton>
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center gap-4">
        <CreditForm onSubmit={(formValue) => handlePayment()} />
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
      </div>
    </>
  );
}

export default ViewCartCheckout;
