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
    <div>
      <Cards {...state} preview />
      <form className="mt-4">
        <CInput
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          type="number"
          name="number"
          placeholder="Card Number"
          maxLength={16}
        />
        <CInput
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          type="number"
          name="expiry"
          placeholder="Expiry"
          maxLength={4}
        />
        <CInput
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          type="password"
          name="cvc"
          placeholder="CVC"
          maxLength={3}
        />
        <CInput
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          type="text"
          name="name"
          placeholder="Name"
          maxLength={16}
        />
        <Popconfirm
          title="Agree submit"
          description="Are you sure to agree this submit?"
          onConfirm={() => onSubmit(state)}
        >
          <CButton type="black" className="px-4 rounded-[50px]">
            Submit
          </CButton>
        </Popconfirm>
      </form>
    </div>
  );
};

export default CreditForm;
