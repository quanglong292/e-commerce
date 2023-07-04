import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import CInput from "./CInput";
import { REQUIRED_MESSAGE } from "../../views/ViewAuthenticate/elements/SignupForm";
import {
  resetFormFields,
  setFormValues,
} from "../../utils/composables/useFormBuilder";
import CTooltip from "./CTooltip";

const AddressForm = (props) => {
  const { isRequired, defaultValues = {} } = props;
  const {
    formState: { errors },
    register,
    handleSubmit,
    control,
    resetField,
    setValue,
    getValues,
  } = useForm({
    defaultValues,
  });

  useEffect(() => {
    if (!defaultValues) resetFormFields(getValues(), resetField);
    else setFormValues(defaultValues, setValue);
  }, [defaultValues]);

  return (
    <form onSubmit={handleSubmit(props.onSubmit)} className="w-full">
      <div className="flex items-center gap-2">
        <p className="text-lg uppercase">Address Form</p>
        <CTooltip text="Will take this address if fully fill in" />
      </div>
      <div className="p-4">
        <div className="flex gap-4">
          <div className="w-full">
            <label>Street</label>
            <CInput
              {...register("street", {
                required: isRequired ? REQUIRED_MESSAGE : false,
              })}
              placeholder="Street"
              className="w-full"
              formError={errors}
            />
          </div>
          <div className="w-full">
            <label>Ward</label>
            <CInput
              {...register("ward", {
                required: isRequired ? REQUIRED_MESSAGE : false,
              })}
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
              {...register("district", {
                required: isRequired ? REQUIRED_MESSAGE : false,
              })}
              placeholder="District"
              className="w-full"
              formError={errors}
            />
          </div>
          <div className="w-full">
            <label>City</label>
            <CInput
              {...register("city", {
                required: isRequired ? REQUIRED_MESSAGE : false,
              })}
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
