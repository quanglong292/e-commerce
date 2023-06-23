import React, { useEffect } from "react";
import FormBuilder from "../../../components/core/FormBuilder";
import { USER_DETAIL_SHCEMA } from "../../../utils/constants/detailUser.constant";
import { Avatar, Collapse, Divider } from "antd";
import { UserOutlined } from "@ant-design/icons";
import UserHistory from "./elements/UserHistory";
import useGlobalStore from "../../../store/global.zustand";
import { useNavigate } from "react-router-dom";
import AddressForm from "../../../components/core/AddressForm";

const text = (
  <p
    style={{
      paddingLeft: 24,
    }}
  >
    A dog is a type of domesticated animal. Known for its loyalty and
    faithfulness, it can be found as a welcome guest in many households across
    the world.
  </p>
);

const items = [
  {
    key: "1",
    header: "User Information",
    children: <FormBuilder schema={USER_DETAIL_SHCEMA} />,
  },
  {
    key: "2",
    header: "Address",
    children: <AddressForm />,
  },
];

const ViewUserDetail = () => {
  const navigate = useNavigate();
  const { token, toggleLoginModal } = useGlobalStore((state) => state);

  // useEffect(() => {
  //   if (!token) {
  //     toggleLoginModal();
  //     navigate("/app");
  //   }
  // }, []);

  return (
    <div className="w-full lg:p-12 pt-0">
      <div className="bg-white shadow-lg rounded-lg p-4">
        <p className="text-2xl uppercase font-semibold">User detail</p>
        <div className="my-4 flex flex-col-reverse lg:flex-row gap-8">
          <div className="w-full lg:w-1/3">
            <p className="uppercase font-semibold">Order History</p>
            <div>
              <UserHistory />
            </div>
          </div>
          <div className="w-full lg:w-2/3">
            <Avatar
              shape="square"
              size={64}
              icon={<UserOutlined />}
              className="mb-4"
            />
            <Collapse defaultActiveKey={["1"]} onChange={() => {}} size="large">
              {items.map((i) => {
                return (
                  <Collapse.Panel {...i}>
                    <div className="p-4 w-full">{i.children}</div>
                  </Collapse.Panel>
                );
              })}
            </Collapse>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUserDetail;
