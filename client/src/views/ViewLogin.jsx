import React, { useEffect, useState } from "react";
import { DoubleRightOutlined } from "@ant-design/icons";
import useGlobalStore from "../store/global.zustand";
import { Modal, notification } from "antd";
import FormBuilder from "../components/core/FormBuilder";

const FORM_LOGIN = [
  "block w-[90%] lg:w-1/2 m-auto mb-4",
  {
    label: "Username:",
    type: "Text",
    field: "userName",
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

const FORM_SIGN_UP = [
  "block w-[90%] lg:w-1/2 m-auto mb-4",
  {
    label: "Username:",
    type: "Text",
    field: "userName",
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
  {
    label: "Mail:",
    type: "Text",
    field: "mail",
    rules: { required: true },
    wrapClassName: "h-[58px] items-start",
    className: "gap-2 items-center my-1",
  },
];

const VIEWS = [
  {
    type: "login",
    next: "sign up",
    formSchema: FORM_LOGIN,
    label: ["login", "sign up"],
  },
  {
    type: "sign up",
    next: "login",
    formSchema: FORM_SIGN_UP,
    label: ["sign up", "login"],
  },
];

const ViewLogin = () => {
  // Store
  const { showLogin, handleLogin, handleRegister, toggleLoginModal } =
    useGlobalStore((state) => state);
  const [view, setView] = useState(VIEWS[0]);

  const handleSubmit = async (e) => {
    if (view.type === "login") handleLogin({ payload: e });
    else {
      await handleRegister(e);
      notification.success({
        message: "Success!",
        placement: "bottomLeft",
      });
      handleChangeForm("login");
    }
  };

  const handleChangeForm = (nextType) => {
    setView(VIEWS.find((i) => i.type === nextType));
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-1 text-lg capitalize">
          {view.type} <span>/</span>
          <div
            onClick={() => handleChangeForm(view.next)}
            className="underline hover:text-blue-500 cursor-pointer flex items-center text-sm capitalize"
          >
            <span>{view.next}</span>{" "}
            <DoubleRightOutlined style={{ fontSize: 8 }} />
          </div>
        </div>
      }
      open={showLogin}
      footer={<></>}
      centered
      onCancel={toggleLoginModal}
    >
      <FormBuilder onSubmit={handleSubmit} schema={view.formSchema} />
    </Modal>
  );
};

export default ViewLogin;
