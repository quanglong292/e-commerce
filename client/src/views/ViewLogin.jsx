import React from "react";
import useGlobalStore from "../store/global.zustand";
import { Modal } from "antd";
import FormBuilder from "../components/core/FormBuilder";

const FORM_LOGIN = [
  "block w-[90%] lg:w-1/2 m-auto mb-4",
  {
    label: "Username:",
    type: "Text",
    field: "username",
    rules: { required: true },
    wrapClassName: "h-[58px] items-start",
    className: "gap-2 items-center my-1",
  },
  {
    label: "Password:",
    type: "Password",
    field: "password",
    rules: { required: true },
    wrapClassName: "h-[58px] items-start",
    className: "gap-2 items-center my-1",
  },
];

const ViewLogin = () => {
  // Store
  const { showLogin, handleLogin } = useGlobalStore((state) => state);

  if (!showLogin) return <></>;

  const handleSubmit = (e) => {
    handleLogin({ payload: e });
  };

  return (
    <Modal
      title="Login"
      open={showLogin}
      //   onOk={handleOk}
      //   onCancel={handleCancel}
      footer={<></>}
      centered
      // bodyStyle={{
      //     height: "fit"
      // }}
    >
      <FormBuilder onSubmit={handleSubmit} schema={FORM_LOGIN} />
    </Modal>
  );
};

export default ViewLogin;
