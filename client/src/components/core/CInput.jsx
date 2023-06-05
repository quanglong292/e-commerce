import React, { memo } from "react";
import "../../assets/styles/input.scss";

const CInput = memo((props) => {
  return (
    <div className="w-full relative pb-6">
      <input {...props} className={"CInput " + props?.className} />
      {props.error && (
        <span className="m-0 text-sm text-red-500 absolute bottom-0 left-[2px]">
          This field is required
        </span>
      )}
    </div>
  );
});

export default CInput;
