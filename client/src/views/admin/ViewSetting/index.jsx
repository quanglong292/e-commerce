import React, { useEffect, useState } from "react";
import { Card, Divider, Typography } from "antd";
import useGlobalStore from "../../../store/global.zustand";
import ChangePasswordForm from "./elements/ChangePasswordForm";
import ImageConfigForm from "./elements/ImageConfigForm";
import SectionHeader from "../../app/ViewProducts/elements/ViewLanding/elements/SectionHeader";
import fetcher from "../../../utils/helpers/fetcher";
import { REQUEST_PARAMS } from "../../../utils/constants/urlPath.constant";

const ViewSetting = () => {
  const { hadnleGetSetting, setting } = useGlobalStore((state) => state);

  // States
  const [editForm, setEditForm] = useState({});

  // Functions
  const handleChangeConfig = (path, value) => {
    if (value === "openEdit") {
    } else {
      const [typeConfig, field] = path.split(".");
      setEditForm({
        ...editForm,
        [typeConfig]: value,
      });
    }
  };
  const handleSaveConfig = async () => {
    await fetcher(REQUEST_PARAMS.UPDATE_SETTING, editForm);
    hadnleGetSetting("force");
  };

  // Effects
  useEffect(() => {
    hadnleGetSetting();
  }, []);

  return (
    <Card className="shadow-xl">
      <div className="md:flex gap-4">
        <div className="md:w-1/2">
          <SectionHeader>Configuration</SectionHeader>
          <ImageConfigForm
            onChange={handleChangeConfig}
            onSave={handleSaveConfig}
            field="logo"
            src={editForm?.["logo"] || setting?.logo}
          />
          <Divider />
          <ImageConfigForm
            onChange={handleChangeConfig}
            onSave={handleSaveConfig}
            field="sizeChart"
            src={editForm?.["sizeChart"] || setting?.sizeChart}
          />
        </div>
        <ChangePasswordForm />
      </div>
    </Card>
  );
};

export default ViewSetting;
