import React, { useEffect } from "react";
import FormBuilder from "../../../components/core/FormBuilder";
import { USER_DETAIL_SHCEMA } from "../../../utils/constants/detailUser.constant";
import { Collapse, Modal } from "antd";
import UserHistory from "./elements/UserHistory";
import useGlobalStore from "../../../store/global.zustand";
import { useNavigate } from "react-router-dom";
import AddressForm from "../../../components/core/AddressForm";
import CAvatar from "../../../components/core/CAvatar";
import AddressSelectBox from "../../../components/layout/AddressSelectBox";
import CButton from "../../../components/core/CButton";
import fetcher from "../../../utils/helpers/fetcher";
import { REQUEST_PARAMS } from "../../../utils/constants/urlPath.constant";
import handleClientError from "../../../utils/helpers/handleClientError";

const items = [
  {
    key: "1",
    header: "User Information",
    children: <FormBuilder schema={USER_DETAIL_SHCEMA} />,
  },
];

const ViewUserDetail = () => {
  const navigate = useNavigate();
  const { user, mutateData } = useGlobalStore((state) => state);

  // State

  const handleUpdateAddress = async (value) => {
    if (!value || !user) return;

    delete value?.paymentMethod;
    console.log({ handleUpdateAddress: value });
    try {
      const data = await fetcher(REQUEST_PARAMS.UPDATE_USER, {
        id: user.id,
        address: value,
      });
      console.log({ newUser: data });
      mutateData("user", data);
    } catch (error) {
      handleClientError(error);
    }
  };

  return (
    <div className="w-full lg:p-12 pt-0">
      <div className="bg-white drop-shadow-2xl rounded-lg p-8">
        <p className="text-2xl uppercase font-semibold">User detail</p>
        <div className="my-4 flex flex-col-reverse lg:flex-row gap-8">
          <div className="w-full lg:w-1/3">
            <p className="uppercase font-semibold">Order History</p>
            <div>
              <UserHistory />
            </div>
          </div>
          <div className="w-full lg:w-2/3">
            <div className="flex items-center gap-4">
              <CAvatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                shape="square"
                size={64}
                className="mb-4"
              />
              <div>
                <p>
                  Name:{" "}
                  <span className="font-semibold">{user?.info?.name}</span>
                </p>
                <p>
                  E-mail:{" "}
                  <span className="font-semibold">{user?.info?.mail}</span>
                </p>
              </div>
            </div>
            <Collapse defaultActiveKey={["1"]} onChange={() => {}} size="large">
              {items.map((i) => {
                return (
                  <Collapse.Panel {...i}>
                    <div className="p-4 w-full">{i.children}</div>
                  </Collapse.Panel>
                );
              })}
              <Collapse.Panel key="2" header="Address">
                <div className="p-4 w-full">
                  <AddressSelectBox items={user?.address} />
                  <CButton type="black">Add+</CButton>
                </div>
              </Collapse.Panel>
            </Collapse>
          </div>
        </div>
      </div>
      <Modal footer={<></>}>
        <AddressForm onSubmit={handleUpdateAddress} />
      </Modal>
    </div>
  );
};

export default ViewUserDetail;
