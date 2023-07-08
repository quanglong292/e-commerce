import React, { memo, useRef } from "react";
import { useForm } from "react-hook-form";
import CInput from "../../../../components/core/CInput";
import { REQUIRED_MESSAGE } from "../../../ViewAuthenticate/elements/SignupForm";
import SectionHeader from "../../../app/ViewProducts/elements/ViewLanding/elements/SectionHeader";
import fetcher from "../../../../utils/helpers/fetcher";
import { REQUEST_PARAMS } from "../../../../utils/constants/urlPath.constant";
import useGlobalStore from "../../../../store/global.zustand";
import { notification } from "antd";
import CButton from "../../../../components/core/CButton";
import { resetFormFields } from "../../../../utils/composables/useFormBuilder";

const ChangePasswordForm = memo(() => {
  const { id = "" } = useGlobalStore((state) => state.user) ?? {};
  const {
    formState: { errors },
    register,
    handleSubmit,
    watch,
    resetField,
    getValues,
  } = useForm();
  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = async ({ password }) => {
    await fetcher(REQUEST_PARAMS.UPDATE_USER, { id, password });
    resetFormFields(getValues(), resetField);
    notification.success({
      message: "Bạn có thể logout/login với mật khẩu mới!",
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-1/2 flex flex-col items-center"
    >
      <SectionHeader>Change password</SectionHeader>
      <CInput
        {...register("oldPassword", {
          required: REQUIRED_MESSAGE,
          validate: (value) =>
            value === "admin123" || "The passwords do not match",
        })}
        placeholder="Mật khẩu cũ"
        className="w-full"
        inputClassName="px-2 py-2"
        formError={errors}
        type="password"
      />
      <CInput
        {...register("password", {
          required: REQUIRED_MESSAGE,
          minLength: {
            value: 8,
            message: "Password must have at least 8 characters",
          },
          pattern: {
            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
            message: "Invalid (capital letter, number)",
          },
        })}
        type="password"
        inputClassName="px-2 py-2"
        placeholder="Mật khẩu mới"
        formError={errors}
        className="w-full"
      />
      <CInput
        {...register("confirnPassword", {
          required: REQUIRED_MESSAGE,
          validate: (value) =>
            value === password.current || "The passwords do not match",
        })}
        type="password"
        inputClassName="px-2 py-2"
        placeholder="Nhập lại mật khẩu mới"
        formError={errors}
        className="w-full"
      />
      <CInput
        type="submit"
        className="bg-black text-white cursor-pointer font-semibold uppercase w-full py-2 text-center hover:bg-gray-800"
        inputClassName="py-2 uppercase font-semibold"
        style={{ padding: 0 }}
        value="Cập nhật mật khẩu"
      />
      <CButton
        className="w-full mt-4 uppercase font-semibold"
        onClick={() => {
          resetFormFields(getValues(), resetField);
        }}
      >
        Xóa
      </CButton>
    </form>
  );
});

export default ChangePasswordForm;
