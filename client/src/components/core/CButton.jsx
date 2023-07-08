import { Button } from "antd";
import React, { memo } from "react";
import "../../assets/styles/button.scss";

const CButton = memo(({ children, ...props }) => {
  if (props.type === "black")
    return (
      <button
        {...props}
        className={
          "bg-black text-white cursor-pointer font-semibold uppercase w-full py-2 text-center hover:bg-gray-800 " +
          props.className
        }
        onClick={(e) => {
          e.preventDefault();
          props.onClick(e);
        }}
      >
        {children}
      </button>
    );

  return <Button {...props}>{children}</Button>;
});

export default CButton;
