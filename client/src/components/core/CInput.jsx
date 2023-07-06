import React, { forwardRef, memo } from "react";
import "../../assets/styles/input.scss";
import { Controller } from "react-hook-form";
import { Radio } from "antd";

const CInput = (props, ref) => {
  const { className, style, inputClassName, formError, ...rest } = props;
  return (
    <div
      className={"w-full flex justify-center relative pb-6 " + className}
      style={style}
    >
      {rest.type === "radio" ? (
        <Controller
          {...rest}
          render={({ field }) => {
            return (
              <Radio.Group
                {...field}
                {...rest}
                optionType="button"
                buttonStyle="solid"
              />
            );
          }}
        />
      ) : (
        <input {...rest} ref={ref} className={"CInput " + inputClassName} />
      )}
      {formError?.[rest.name] && (
        <span className="m-0 text-xs text-red-500 absolute bottom-[8px] left-[2px]">
          {formError?.[rest.name] && <p>{formError?.[rest.name]?.message}</p>}
        </span>
      )}
    </div>
  );
};

export default forwardRef(CInput);
