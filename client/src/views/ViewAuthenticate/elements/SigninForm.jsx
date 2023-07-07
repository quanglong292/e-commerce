import React from "react";
import { useForm } from "react-hook-form";
import CInput from "../../../components/core/CInput";
import { REQUIRED_MESSAGE } from "./SignupForm";

const SigninForm = (props) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm();

  return (
    <form
      onSubmit={handleSubmit(props.onSubmit)}
      className="w-full flex flex-col items-center"
    >
      <CInput
        {...register("userName", { required: REQUIRED_MESSAGE })}
        placeholder="Username"
        className="w-full"
        inputClassName="px-2 py-2"
        formError={errors}
        type="text"
      />
      <CInput
        {...register("password", { required: REQUIRED_MESSAGE })}
        type="password"
        placeholder="Password"
        className="w-full"
        inputClassName="px-2 py-2"
        formError={errors}
      />
      <div className="w-full flex justify-between text-sm">
        <div className="flex gap-2 justify-start items-start text-gray-400">
          <CInput
            {...register("remember")}
            type="checkbox"
            className="w-[14px]"
          />
          <div className="whitespace-nowrap">Keep me signed in</div>
        </div>
        {/* <div className="text-gray-400 hover:underline cursor-pointer">
          Forgot password?
        </div> */}
      </div>
      <CInput
        type="submit"
        className="bg-black text-white cursor-pointer font-semibold uppercase w-full py-2 text-center hover:bg-gray-800"
        inputClassName="py-2 uppercase font-semibold"
        style={{ padding: 0 }}
      />
    </form>
  );
};

export default SigninForm;
