import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import React, { memo } from "react";

const CAvatar = memo(({ className, ...rest }) => {
  return (
    <Avatar
      {...rest}
      className={"flex justify-center items-center " + className}
      icon={<UserOutlined />}
    />
  );
});

export default CAvatar;
