import { Dropdown } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import CButton from "../../CButton";

const AppsNavigator = (props) => {
  const { className } = props;
  const navigate = useNavigate();

  return (
    <div className={"w-[25%] justify-end " + className}>
      <Dropdown
        menu={{
          items: [
            {
              label: <div onClick={() => navigate("/app")}>Distribution</div>,
              key: "0",
            },
            {
              label: <div onClick={() => navigate("/product")}>Admin</div>,
              key: "2",
            },
            // {
            //   label: <div onClick={() => navigate("/crm/")}>CRM</div>,
            //   key: "1",
            // },
          ],
        }}
        trigger={["click"]}
        placement="bottomRight"
      >
        <CButton type="primary">Apps</CButton>
      </Dropdown>
    </div>
  );
};

export default AppsNavigator;
