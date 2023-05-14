import { Divider, Dropdown } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
import CButton from "../../CButton";
import { MenuOutlined } from "@ant-design/icons";
import AppsNavigator from "./AppsNavigator";

const MobileNav = ({ schema = [] }) => {
  return (
    <div className="lg:hidden flex items-center justify-between gap-4">
      <Dropdown
        menu={{
          items: [
            ...schema.map((i) => ({
              label: (
                <NavLink to={`${i.path}`} className="w-full">
                  {i.label}
                </NavLink>
              ),
              key: i.key,
            })),
            ...[
              {
                label: <Divider />,
                key: "a1",
              },
              {
                label: <CButton className="w-full">Wish list</CButton>,
                key: "a2",
              },
              {
                label: (
                  <CButton
                    onClick={() => navigate("app/cart")}
                    className="w-full"
                  >
                    Cart
                  </CButton>
                ),
                key: "a3",
              },
              {
                label: (
                  <CButton
                    onClick={() => {
                      navigate("app/user/detail");
                    }}
                    className="w-full"
                  >
                    User
                  </CButton>
                ),
                key: "a4",
              },
            ],
          ],
        }}
        trigger={["click"]}
        placement="bottomRight"
      >
        <CButton icon={<MenuOutlined />}></CButton>
      </Dropdown>
      <AppsNavigator />
    </div>
  );
};

export default MobileNav;
