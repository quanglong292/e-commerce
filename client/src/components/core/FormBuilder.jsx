import { Button, Checkbox, Input, Radio, Select, Switch } from "antd";
import React, { memo, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CButton from "./CButton";
import "../../assets/styles/formBuilder.scss";
import fetcher from "../../utils/helpers/fetcher";
import TextArea from "antd/es/input/TextArea";
import set from "lodash/set";
import findPath from "../../utils/helpers/findPath";
import isEqual from "lodash/isEqual";

const getNewLineOfArrayFields = (field, idx) => {
  const fields = [
    {
      label: "Name",
      type: "Text",
      field: `${field}.${idx}.name`,
      rules: { required: true },
      wrapClassName: "h-[70px]",
      className: "flex-col",
    },
    {
      label: "Value",
      type: "Text",
      field: `${field}.${idx}.value`,
      rules: { required: true },
      wrapClassName: "h-[70px]",
      className: "flex-col",
    },
    {
      label: "Add more",
      type: "Action",
      field: ``,
      rules: { required: false },
      wrapClassName: "",
      className: "",
      buttonType: "primary",
    },
  ];

  return fields;
};

const generateEmptyFields = (schema) => {
  if (Array.isArray(schema)) {
    const newObj = {};
    schema.forEach((i) => {
      set(newObj, i.field, "");
    });

    return newObj;
  } else {
    const clone = JSON.parse(JSON.stringify(schema));
    Object.entries(clone).forEach(([key, value]) => {
      if (Object.keys(value).length) {
        const path = findPath(value);
        if (Boolean(path) && path !== "type") key += `.${findPath(value)}`;
        set(clone, key, "");
      } else set(clone, key, "");
    });

    return clone;
  }
};

const generateInitArrayFields = (schema) => {
  const arrayTypes = schema.filter((i) => i.type === "Array");

  return arrayTypes.map((i, idx) => {
    const nextIndex = i?.mapData?.length ?? 2 - 3 + 1;
    return {
      field: i.field,
      mapData: getNewLineOfArrayFields(i.field, nextIndex),
    };
  });
};

const getInputType = (type) => {
  let TypeInput = Input;

  if (type === "CheckBox") TypeInput = Checkbox;
  if (type === "Select") TypeInput = Select;
  if (type === "Switch") TypeInput = Switch;
  if (type === "Button") TypeInput = Button;
  if (["TextArea", "Password"].includes(type)) TypeInput = Input[type];

  return TypeInput;
};

const FormBuilder = memo((props) => {
  const { formValue, onSubmit, onChange, loading } = props;
  const {
    handleSubmit,
    getValues,
    control,
    reset,
    setValue,
    formState: { errors },
    watch,
  } = useForm();
  const [schema, setSchema] = useState(props.schema);
  const [fetchedOptions, setFetchedOptions] = useState({});
  const [arrayFields, setArrayFields] = useState([]);

  const isShowSubmit = !(
    typeof schema[0] === "string" && schema[0].includes("filterForm")
  );

  const handleFetchOptionValue = async (schema) => {
    let newSchema = [];

    for (let i of schema) {
      if (i.fetchValue && i.type === "Select") {
        const isFetchedBefore = fetchedOptions[i.field];
        let options = [];
        if (isFetchedBefore) {
          options = isFetchedBefore;
        } else {
          const data = await fetcher(i.fetchValue);
          options = data.map((j) => ({
            ...j,
            value: j.id,
            label: j.name,
          }));
        }

        newSchema = [
          ...newSchema,
          {
            ...i,
            options,
          },
        ];
        setFetchedOptions({
          ...fetchedOptions,
          [i.field]: options,
        });
      } else {
        newSchema.push(i);
      }
    }
    setSchema(newSchema);
    handleInitValue(formValue)
  };

  const handleResetFields = () => {
    const emptyFieldsForReset = generateEmptyFields(formValue ?? props.schema);
    reset(emptyFieldsForReset);
  };

  const handleAddMoreField = (field) => {
    const newArray = arrayFields.map((i) => {
      const nextIndex = i.mapData.length - 3 + 1;
      if (i.field === field) {
        return {
          ...i,
          mapData: [...i.mapData, ...getNewLineOfArrayFields(field, nextIndex)],
        };
      }

      return i;
    });
    setArrayFields(newArray);
  };

  const handleInitValue = (values) => {
    if (!values) return 
    handleResetFields()
    Object.entries(values).forEach(([key, value]) => {
      setValue(key, value ?? "")
    })
  };
  const handleFormChange = ({ name = "", value, formValue }) => {
    onChange(name, value, formValue);
  };

  // Effects
  useEffect(() => {
    handleFetchOptionValue(props.schema);
    setArrayFields(generateInitArrayFields(props.schema));
  }, [props]);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      handleFormChange({ name, value: value[name], formValue: value });
      console.log({name, value});
    });
    return () => subscription.unsubscribe();
  }, [watch]);

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

            let className =
              "flex flex-col justify-between h-[70px] " + i.wrapClassName;
            const TypeInput = getInputType(type);

            if (type === "Array") {
              const fields =
                arrayFields?.find((k) => k.field === i.field)?.mapData ?? [];
              return (
                <div className="col-span-3 my-2">
                  <label className="mb-1 capitalize font-semibold">
                    {i.label}
                  </label>
                  <div className="grid grid-cols-5 gap-2 items-end">
                    {fields.map((l, ldex) => {
                      const TypeInput = getInputType(l.type);

                      if (l.type === "Action") {
                        const isLastIndex = Boolean(ldex === fields.length - 1);
                        if (isLastIndex)
                          return (
                            <Button
                              onClick={() => handleAddMoreField(i.field)}
                              type={l.buttonType}
                            >
                              {l.label}
                            </Button>
                          );

                        return <div></div>;
                      }

                      return (
                        <div className="col-span-2">
                          <label className="mb-1 capitalize text-sm">
                            {l.label}
                          </label>
                          <Controller
                            name={l.field}
                            control={control}
                            rules={l.rules ?? {}}
                            render={({ field }) => {
                              return <TypeInput {...field} {...i} />;
                            }}
                          />
                          {errors[l.field] && (
                            <div className="text-xs text-red-500">
                              This field is required
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            }

            return (
              <div className={className}>
                <div className={"flex " + i.className}>
                  <label className="mb-1 capitalize">{i.label}</label>
                  <Controller
                    name={i.field}
                    control={control}
                    rules={i.rules ?? {}}
                    render={({ field }) => {
                      return (
                        <TypeInput
                          {...field}
                          {...i}
                        />
                      );
                    }}
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
          <div className="w-full flex items-center gap-4">
            <CButton type="primary" htmlType="submit" loading={loading}>
              Submit
            </CButton>
            <CButton type="default" onClick={handleResetFields}>
              Clear
            </CButton>
          </div>
        )}
      </form>
    </div>
  );
});

export default FormBuilder;
