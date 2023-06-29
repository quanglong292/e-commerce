import React from "react";
import { useFieldArray, Controller } from "react-hook-form";
import CButton from "../../CButton";
import { Input } from "antd";
import { useEffect } from "react";

function FieldArray({
  arrayFields,
  defaultValues,
  field,
  rules,
  control,
  errors,
  formValue,
  reset,
  ...otherProps
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: field,
  });

  const handleInitData = () => {
    if (formValue?.[field]?.length) {
      append(formValue[field]);
    } else append(defaultValues[0]);
  };

  useEffect(() => {
    handleInitData();

    return () => {
      fields.forEach((_, i) => remove(i));
      reset();
    };
  }, [formValue]);

  return (
    <div>
      <ul className="">
        <label className="mb-1 capitalize">{otherProps.label}</label>
        {fields.map((item, index) => (
          <li className="mb-4" key={item.id}>
            <div className="grid grid-cols-6 items-end gap-4">
              {arrayFields.map((i) => {
                return (
                  <div className="col-span-2" key={i.field}>
                    <label>{i.label}</label>
                    <Controller
                      render={({ field }) => <Input {...field} />}
                      name={`${field}.${index}.${i.field}`}
                      control={control}
                      rules={rules}
                    />
                  </div>
                );
              })}
              <CButton
                className="col-span-1 h-fit"
                type="black"
                onClick={() => remove(index)}
              >
                Delete
              </CButton>
              <CButton
                className="col-span-1 h-fit"
                type="black"
                onClick={() => append({ firstName: "bill", lastName: "luo" })}
              >
                append
              </CButton>
            </div>
            {errors?.[field]?.[index] && (
              <div className="text-xs text-red-500">
                These fields is required
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FieldArray;
