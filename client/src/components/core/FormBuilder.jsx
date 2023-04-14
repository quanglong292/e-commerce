import { Checkbox, Input, Select, Switch } from "antd";
import React, { memo, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CButton from "./CButton";
import "../../assets/styles/formBuilder.scss";
import fetcher from "../../utils/functions/fetcher";
import TextArea from "antd/es/input/TextArea";

const FormBuilder = memo((props) => {
  const { onSubmit, loading } = props;
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [schema, setSchema] = useState(props.schema);
  const [isFetchedOptions, setIsFetchedOptions] = useState(false);

  const isShowSubmit = !(
    typeof schema[0] === "string" && schema[0].includes("filterForm")
  );

  const handleFetchOptionValue = async (schema) => {
    let newSchema = [];

    for (let i of schema) {
      if (i.fetchValue && i.type === "Select" && !isFetchedOptions) {
        const data = await fetcher(i.fetchValue);
        newSchema = [
          ...newSchema,
          {
            ...i,
            options: data.map((j) => ({ ...j, value: j.id, label: j.name })),
          },
        ];
      } else newSchema.push(i);
    }


    setSchema(newSchema);
    setIsFetchedOptions(true);
  };

  useEffect(() => {
    handleFetchOptionValue(props.schema);
  }, [props.schema]);

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
            if (type === "CheckBox") TypeInput = Checkbox;
            if (type === "Select") TypeInput = Select;
            if (type === "Switch") TypeInput = Switch;
            if (["TextArea"].includes(type)) TypeInput = Input[type];

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
