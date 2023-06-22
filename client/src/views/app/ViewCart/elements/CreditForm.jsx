import React, { useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import CInput from "../../../../components/core/CInput";
import { Popconfirm } from "antd";
import CButton from "../../../../components/core/CButton";

const CreditForm = ({ onSubmit }) => {
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  return (
    <div className="w-full">
      <Cards {...state} preview />
      <form className="mt-4">
        <CInput
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          type="number"
          name="number"
          placeholder="Card Number"
          maxLength={16}
          className="w-full"
        />
        <CInput
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          type="number"
          name="expiry"
          placeholder="Expiry"
          maxLength={4}
          className="w-full"
        />
        <CInput
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          type="password"
          name="cvc"
          placeholder="CVC"
          maxLength={3}
          className="w-full"
        />
        <CInput
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          type="text"
          name="name"
          placeholder="Name"
          maxLength={16}
          className="w-full"
        />
        <Popconfirm
          title="Agree submit"
          description="Are you sure to agree this submit?"
          onConfirm={() => onSubmit(state)}
        >
          <CButton type="black" className="w-1/2 px-4">
            Pay with credit
          </CButton>
        </Popconfirm>
      </form>
    </div>
  );
};

export default CreditForm;
