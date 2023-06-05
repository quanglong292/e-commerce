import React from "react";
import { useForm } from "react-hook-form";
import CInput from "../../../components/core/CInput";

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
        {...register("username", { required: true })}
        placeholder="Username"
        className="w-full"
        error2={errors?.username}
      />
      <CInput
        {...register("password", { required: true })}
        type="password"
        placeholder="Password"
        className="w-full"
        error2={errors?.password}
      />
      <div className="w-full flex justify-between text-sm">
        <div className="flex gap-2 justify-start text-gray-400">
          <CInput type="checkbox" placeholder="Username" className="w-[14px]" />
          <div>Keep me signed in</div>
        </div>
        <div className="text-gray-400 hover:underline cursor-pointer">
          Forgot password?
        </div>
      </div>
      <CInput
        type="submit"
        className="bg-black text-white cursor-pointer font-semibold font-mono uppercase w-full py-2 text-center hover:bg-gray-800"
      />
    </form>
  );
};

export default SigninForm;
