import React, { useRef } from "react";
import CInput from "../../../components/core/CInput";
import { useForm } from "react-hook-form";

export const REQUIRED_MESSAGE = {
  value: true,
  message: "This field is required",
};

const SignupForm = (props) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
    control,
    watch,
  } = useForm();
  const password = useRef({});
  password.current = watch("password", "");

  return (
    <form
      onSubmit={handleSubmit(props.onSubmit)}
      className="w-full flex flex-col items-center"
    >
      <CInput
        {...register("fullName", { required: REQUIRED_MESSAGE })}
        inputClassName="px-2 py-2"
        placeholder="Full name"
        className="w-full"
        formError={errors}
      />
      <CInput
        {...register("dateOfBirth", { required: REQUIRED_MESSAGE })}
        type="date"
        inputClassName="px-2 py-2"
        placeholder="Date of birth"
        formError={errors}
        className="w-full"
      />
      <CInput
        {...register("userName", { required: REQUIRED_MESSAGE })}
        inputClassName="px-2 py-2"
        placeholder="Username"
        className="w-full"
        formError={errors}
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
        placeholder="Password"
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
        placeholder="Confirm Password"
        formError={errors}
        className="w-full"
      />
      <CInput
        {...register("mail", {
          required: REQUIRED_MESSAGE,
        })}
        type="email"
        inputClassName="px-2 py-2"
        placeholder="E-Mail@mail.com"
        formError={errors}
        className="w-full"
      />
      <CInput
        {...register("phone", { required: REQUIRED_MESSAGE })}
        inputClassName="px-2 py-2"
        placeholder="Phone"
        className="w-full"
        formError={errors}
      />
      <CInput
        type="radio"
        name={"sex"}
        control={control}
        rules={{ required: REQUIRED_MESSAGE }}
        options={[
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
        ]}
        formError={errors}
      />
      <p className="text-center text-gray-500 text-sm mb-4">
        By creating an account, you agree to Nike's Privacy{" "}
        <span className="underline">Policy and Terms of Use.</span>
      </p>
      {/* SUBMIT */}
      <CInput
        type="submit"
        className="bg-black text-white cursor-pointer font-semibold uppercase w-full py-2 text-center hover:bg-gray-800"
        style={{ padding: 0 }}
        inputClassName="py-2 uppercase font-semibold"
      />
    </form>
  );
};

export default SignupForm;
