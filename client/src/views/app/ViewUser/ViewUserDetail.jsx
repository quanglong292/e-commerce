import React, { useEffect } from "react";
import FormBuilder from "../../../components/core/FormBuilder";
import { USER_DETAIL_SHCEMA } from "../../../utils/constants/detailUser.constant";
import { Avatar, Divider } from "antd";
import { UserOutlined } from "@ant-design/icons";
import UserHistory from "./elements/UserHistory";
import useGlobalStore from "../../../store/global.zustand";
import { useNavigate } from "react-router-dom";

const ViewUserDetail = () => {
  const navigate = useNavigate();
  const { tkn, toggleLoginModal } = useGlobalStore((state) => state);

  useEffect(() => {
    if (!tkn) {
      toggleLoginModal();
      navigate("/app");
    }
  }, []);

  return (
    <div className="w-full bg-white shadow-2xl rounded-lg p-4">
      <p className="text-2xl uppercase font-semibold">User detail</p>
      <div className="my-4 flex flex-col-reverse lg:flex-row gap-4">
        <div className="w-full lg:w-1/2">
          <p className="uppercase font-semibold">Order History</p>
          <div>
            <UserHistory />
          </div>
        </div>
        <Divider className="hidden lg:block" type="vertical" />
        <div className="w-full lg:w-1/2">
          <Avatar
            shape="square"
            size={64}
            icon={<UserOutlined />}
            className="mb-4"
          />
          <FormBuilder schema={USER_DETAIL_SHCEMA} />
        </div>
      </div>
    </div>
  );
};

export default ViewUserDetail;
