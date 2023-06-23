import React from "react";
import { useForm } from "react-hook-form";
import CInput from "./CInput";
import { REQUIRED_MESSAGE } from "../../views/ViewAuthenticate/elements/SignupForm";

// street: String,
//             ward: String,
//             district: String,
//             city: String,

const AddressForm = (props) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
    control,
    watch,
  } = useForm();

  return (
    <form onSubmit={handleSubmit(props.onSubmit)} className="w-full">
      <p className="text-lg uppercase">Address</p>
      <div className="p-4">
        <div className="flex gap-4">
          <div className="w-full">
            <label>Street</label>
            <CInput
              {...register("street", { required: REQUIRED_MESSAGE })}
              placeholder="Street"
              className="w-full"
              formError={errors}
            />
          </div>
          <div className="w-full">
            <label>Ward</label>
            <CInput
              {...register("ward", { required: REQUIRED_MESSAGE })}
              placeholder="Ward"
              className="w-full"
              formError={errors}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-full">
            <label>District</label>
            <CInput
              {...register("district", { required: REQUIRED_MESSAGE })}
              placeholder="District"
              className="w-full"
              formError={errors}
            />
          </div>
          <div className="w-full">
            <label>City</label>
            <CInput
              {...register("city", { required: REQUIRED_MESSAGE })}
              placeholder="City"
              className="w-full"
              formError={errors}
            />
          </div>
        </div>
      </div>
      <p className="text-lg uppercase">Payent method</p>
      <div className="p-4 w-fit">
        <CInput
          type="radio"
          name={"paymentMethod"}
          control={control}
          rules={{ required: REQUIRED_MESSAGE }}
          options={[
            { label: "Paypal", value: "paypal" },
            { label: "COD", value: "cod" },
          ]}
          formError={errors}
        />
      </div>
      <CInput
        type="submit"
        className="bg-black text-white cursor-pointer font-semibold font-mono uppercase w-full py-2 text-center hover:bg-gray-800"
      />
    </form>
  );
};

export default AddressForm;
