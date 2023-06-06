import React, { useState } from "react";
import Logo from "../../assets/icons/Logo";
import { useForm } from "react-hook-form";
import SigninForm from "./elements/SigninForm";
import SignupForm from "./elements/SignupForm";
import useGlobalStore from "../../store/global.zustand";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

const ViewAuthenticate = () => {
  const navigate = useNavigate();
  const { handleLogin, handleRegister, toggleLoginModal, setToken } =
    useGlobalStore((state) => state);

  // State
  const [formType, setFormType] = useState("signin");

  // Functions
  const onSubmit = async (data) => {
    // console.log({ onSubmit: data });
    if (data.remember) setToken();

    delete data.remember;

    if (formType === "signin") {
      handleLogin({ payload: data });
      navigate("/product");
      toggleLoginModal();
    } else {
      await handleRegister(data);
      notification.success({
        message: "Success!",
        placement: "bottomLeft",
      });
      setTimeout(() => {
        setFormType("signin");
      }, 100);
    }
  };

  return (
    <div className="h-full w-full flex justify-center pt-24">
      <div className="w-[40%] flex flex-col items-center gap-4">
        <Logo />
        <p className="w-[80%] text-center uppercase font-bold text-2xl">
          {formType === "signin"
            ? "your account for everything nike"
            : "your account for everything Mike"}
        </p>
        {formType === "signin" ? (
          <SigninForm onSubmit={onSubmit} />
        ) : (
          <SignupForm onSubmit={onSubmit} />
        )}
        <div className="text-gray-400 cursor-pointer">
          {formType === "signin" ? (
            <>
              Not a member?{" "}
              <span
                onClick={() => setFormType("signup")}
                className="text-black underline"
              >
                Join us
              </span>
            </>
          ) : (
            <>
              You are member?{" "}
              <span
                onClick={() => setFormType("signin")}
                className="text-black underline"
              >
                Sign in
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewAuthenticate;
