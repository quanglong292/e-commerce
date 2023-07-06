import { Card, Divider } from "antd";
import React, { useEffect } from "react";
import useGlobalStore from "../../../store/global.zustand";
import EditableImage from "./elements/EditableImage";
import CInput from "../../../components/core/CInput";
import CButton from "../../../components/core/CButton";
import ChangePasswordForm from "./elements/ChangePasswordForm";

const ViewSetting = () => {
  const { hadnleGetSetting, setting } = useGlobalStore((state) => state);

  // Effects
  useEffect(() => {
    hadnleGetSetting();
  }, []);

  return (
    <Card className="shadow-xl">
      <div className="md:flex gap-4">
        <div className="md:w-2/3">
          <div className="flex gap-4 mb-8">
            <EditableImage
              src={setting?.logo}
              className="w-[144px] h-[144px]"
            />
            <div className="w-full flex flex-col gap-4 justify-between">
              {/* <div> */}
                {/* <label htmlFor="">URL: </label> */}
                {/* <input className="border-2 px-2" placeholder="Image url" /> */}
              {/* </div> */}
              <div className="flex items-start gap-1">
                {/* <label htmlFor="">Description: </label> */}
                <textarea className="border-2 px-2 w-full h-full" rows={4} placeholder="Description" />
              </div>
              <div>
                <CButton>Save change</CButton>
              </div>
            </div>
          </div>
          <Divider />
          <div className="flex gap-4">
            <EditableImage
              src={setting?.sizeChart}
              className="w-[144px] h-[144px]"
            />
            <div className="w-full flex flex-col gap-4 justify-between">
              {/* <div> */}
                {/* <label htmlFor="">URL: </label> */}
                {/* <input className="border-2 px-2" placeholder="Image url" /> */}
              {/* </div> */}
              <div className="flex items-start gap-1">
                {/* <label htmlFor="">Description: </label> */}
                <textarea className="border-2 px-2 w-full h-full" rows={4} placeholder="Description" />
              </div>
              <div>
                <CButton>Save change</CButton>
              </div>
            </div>
          </div>
        </div>
        <ChangePasswordForm />
      </div>
    </Card>
  );
};

export default ViewSetting;
