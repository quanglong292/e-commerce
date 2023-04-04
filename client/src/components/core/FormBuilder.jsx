import { Checkbox, Input, Select } from "antd";
import React, { memo } from "react";
import { Controller, useForm } from "react-hook-form";
import CButton from "./CButton";

const FormBuilder = memo((props) => {
  const { onSubmit, schema, loading } = props;
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  return (
    <div className="form-builder">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-4 gap-4 mb-4">
          {schema.map((i) => {
            const { type } = i;
            let TypeInput = Input;
            let className = "flex flex-col justify-between h-[70px]";
            if (type === "Text") TypeInput = Input;
            if (type === "CheckBox") TypeInput = Checkbox;
            if (type === "Select") TypeInput = Select
            return (
              <div className={className}>
                <div className="flex flex-col">
                  <label className="mb-1 ">{i.label}</label>
                  <Controller
                    name={i.field}
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => <TypeInput {...field} {...i} />}
                  />
                </div>
                {errors[i.field] && (
                  <div className="text-xs text-red-500">
                    This field is required
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <CButton type="primary" htmlType="submit" loading={loading}>
          Submit
        </CButton>
      </form>
    </div>
  );
});

export default FormBuilder;
