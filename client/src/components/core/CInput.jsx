import React, { forwardRef, memo } from "react";
import "../../assets/styles/input.scss";

const CInput = (props, ref) => {
  const { className, formError, ...rest } = props;
  return (
    <div className="w-full relative pb-6">
      <input {...rest} ref={ref} className={"CInput " + className} />
      {formError && (
        <span className="m-0 text-sm text-red-500 absolute bottom-0 left-[2px]">
          This field is required
        </span>
      )}
    </div>
  );
};

export default forwardRef(CInput);
