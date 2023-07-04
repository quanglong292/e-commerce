import { QuestionCircleFilled } from "@ant-design/icons";
import { Tooltip } from "antd";
import React, { memo } from "react";

const CTooltip = memo(({ text }) => {
  return (
    <Tooltip title={text ?? "Tooltip"}>
      <QuestionCircleFilled />
    </Tooltip>
  );
});

export default CTooltip;
