import { Checkbox, Input, Select } from "antd";
import React, { memo } from "react";
import { Controller, useForm } from "react-hook-form";
import CButton from "./CButton";
import "../../assets/styles/formBuilder.scss";

const FormBuilder = memo((props) => {
  const { onSubmit, schema, loading } = props;
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const isShowSubmit = !(
    typeof schema[0] === "string" && schema[0].includes("filterForm")
  );

  return (
    <div className="form-builder">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className={
            typeof schema[0] === "string"
              ? schema[0]
              : "grid grid-cols-4 gap-4 mb-4"
          }
        >
          {schema.map((i) => {
            if (typeof i === "string") return;

            const { type } = i;
            let TypeInput = Input;
            let className =
              "flex flex-col justify-between h-[70px] " + i.wrapClassName;
            if (type === "Text") TypeInput = Input;
            if (type === "CheckBox") TypeInput = Checkbox;
            if (type === "Select") TypeInput = Select;
            return (
              <div className={className}>
                <div className={"flex " + i.className}>
                  <label className="mb-1 capitalize  ">{i.label}</label>
                  <Controller
                    name={i.field}
                    control={control}
                    rules={i.rules ?? {}}
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

        {isShowSubmit && (
          <CButton type="primary" htmlType="submit" loading={loading}>
            Submit
          </CButton>
        )}
      </form>
    </div>
  );
});

export default FormBuilder;
