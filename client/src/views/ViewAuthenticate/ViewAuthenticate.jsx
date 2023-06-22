import React, { useState } from "react";
import Logo from "../../assets/icons/Logo";
import SigninForm from "./elements/SigninForm";
import SignupForm from "./elements/SignupForm";
import useGlobalStore from "../../store/global.zustand";
import { notification } from "antd";
import { useNavigate, useResolvedPath } from "react-router-dom";
import { cloneDeep } from "lodash";
import fetcher from "../../utils/helpers/fetcher";
import { REQUEST_PARAMS } from "../../utils/constants/urlPath.constant";
import { checkAccountPermission } from "../../utils/composables/useToken";

const ViewAuthenticate = () => {
  const navigate = useNavigate();
  const { pathname } = useResolvedPath();
  const { handleLogin, setToken, checkToken } = useGlobalStore(
    (state) => state
  );

  // State
  const [formType, setFormType] = useState("signin");

  // Functions
  const validateRegister = (form) => {
    const {
      confirnPassword,
      dateOfBirth,
      fullName,
      mail,
      phone,
      sex,
      ...others
    } = cloneDeep(form);

    return {
      ...others,
      info: {
        name: fullName,
        phone: phone,
        birthDate: dateOfBirth,
        mail,
        sex,
      },
    };
  };
  const onSubmit = async (data) => {
    if (data.remember) setToken();

    delete data.remember;

    try {
      if (formType === "signin") {
        await handleLogin({ payload: data }, "ViewAuthenticate");

        if (pathname.includes("app")) navigate(-1);
        else navigate("/");

        checkAccountPermission(checkToken, handleLogout);
      } else {
        const validatedForm = validateRegister(data);
        await fetcher(REQUEST_PARAMS.ADD_USER, validatedForm);
        notification.success({
          message: "Success!",
          placement: "bottomLeft",
        });
        setTimeout(() => {
          setFormType("signin");
        }, 100);
      }
    } catch (error) {}
  };

  return (
    <>
      <div className="h-full w-full flex justify-center pt-24">
        <div className="w-[24%] flex flex-col items-center gap-4">
          <Logo />
          <p className="w-[80%] text-center uppercase font-bold text-2xl">
            {formType === "signin"
              ? "your account for everything nike"
              : "your account for everything Mike"}
          </p>
          {formType === "signup" && (
            <p className="text-gray-500 text-center">
              Create your Nike Member profile and get first access to the very
              best of Nike products, inspiration and community.
            </p>
          )}
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
    </>
  );
};

export default ViewAuthenticate;
