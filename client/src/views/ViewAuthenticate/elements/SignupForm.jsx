import React from "react";
import CInput from "../../../components/core/CInput";
import { useForm } from "react-hook-form";

const SignupForm = (props) => {
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
        {...register("fullName", { required: true })}
        placeholder="Full name"
        className="w-full"
        formError={errors?.fullName}
      />
      <CInput
        {...register("dateOfBirth", { required: true })}
        type="date"
        placeholder="Date of birth"
        formError={errors?.dateOfBirth}
        className="w-full"
      />
      <CInput
        {...register("userName", { required: true })}
        placeholder="Username"
        className="w-full"
        formError={errors?.username}
      />
      <CInput
        {...register("password", { required: true })}
        type="password"
        placeholder="Password"
        formError={errors?.password}
        className="w-full"
      />
      <CInput
        {...register("confirnPassword", { required: true })}
        type="password"
        placeholder="Confirm Password"
        formError={errors?.confirnPassword}
        className="w-full"
      />

      {/* SUBMIT */}
      <CInput
        type="submit"
        className="bg-black text-white cursor-pointer font-semibold font-mono uppercase w-full py-2 text-center hover:bg-gray-800"
      />
    </form>
  );
};

export default SignupForm;
