import { Button } from "antd";
import React, { memo } from "react";
import "../../assets/styles/button.scss"

const CButton = memo(({ children, ...props }) => {
  return <Button {...props}>{children}</Button>;
});

export default CButton;
