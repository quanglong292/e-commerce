import React, { useEffect, useState } from "react";
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
import { cloneDeep } from "lodash";
import formatDate, {
  formatToSystemDate,
} from "../../../utils/helpers/formatDate";
import { getGHNOrder } from "../../../utils/helpers/ghnFetcher";
import CModal from "../../../components/core/CModal";

const ViewUserDetail = () => {
  const navigate = useNavigate();
  const { user, address, handleUpdate } = useGlobalStore((state) => state);

  // State
  const [infoForm, setInfoForm] = useState({});
  const [openAddressForm, setOpenAddressForm] = useState(false);
  const [editAddressForm, setEditAddressForm] = useState(null);

  // Functions
  const handleInitData = async (user) => {
    if (user) {
      // console.log({ user });
      const info = cloneDeep(user.info) ?? {};
      info.birthDate = formatDate(info?.birthDate, "YYYY-MM-DD");
      // console.log({ info });
      setInfoForm(info);
    }
  };
  const handleUpdateAddress = async (value, type) => {
    if (!value) return;

    delete value?.paymentMethod;

    await handleUpdate({ address: value }, type);
    setEditAddressForm(null);
  };
  const handleUpdateInfo = async (value) => {
    if (!value.birthDate) value.birthDate = formatToSystemDate(value.birthDate);

    await handleUpdate({ info: value });
  };

  function toggleAddressForm() {
    return setOpenAddressForm(!openAddressForm);
  }

  useEffect(() => {
    handleInitData(user);
  }, [user]);

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
              <Collapse.Panel key="1" header="Information">
                <div className="p-4 w-full">
                  <FormBuilder
                    formValue={infoForm}
                    schema={USER_DETAIL_SHCEMA}
                    onSubmit={handleUpdateInfo}
                  />
                </div>
              </Collapse.Panel>
              <Collapse.Panel key="2" header="Address">
                <div className="p-4 w-full">
                  <AddressSelectBox
                    onEdit={(rec) => setEditAddressForm(rec)}
                    items={address}
                  />
                  <CButton onClick={toggleAddressForm} type="black">
                    Add+
                  </CButton>
                </div>
              </Collapse.Panel>
            </Collapse>
          </div>
        </div>
      </div>
      <CModal
        open={openAddressForm || Boolean(editAddressForm)}
        footer={<></>}
        onCancel={() => {
          if (editAddressForm) {
            setEditAddressForm(null);
          } else toggleAddressForm();
        }}
      >
        <AddressForm
          defaultValues={editAddressForm}
          isRequired
          onSubmit={handleUpdateAddress}
        />
        {Boolean(editAddressForm) && (
          <div className="flex gap-4">
            <CButton
              onClick={() => handleUpdateAddress(editAddressForm, "delete")}
              className="w-full"
              danger
            >
              Delete
            </CButton>
            <CButton className="w-full">Close</CButton>
          </div>
        )}
      </CModal>
    </div>
  );
};

export default ViewUserDetail;
