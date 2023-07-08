import React, { memo, useState } from "react";
import EditableImage from "./EditableImage";
import CButton from "../../../../components/core/CButton";
import CInput from "../../../../components/core/CInput";
import { Modal } from "antd";
import handleClientError from "../../../../utils/helpers/handleClientError";
import CModal from "../../../../components/core/CModal";

const ImageConfigForm = memo(({ src, field, onSave, onChange }) => {
  const [previewImage, setPreviewImage] = useState({});
  const [openEdit, setOpenEdit] = useState(false);

  const handleClickOk = () => {
    const isValid = !previewImage.target.validity.patternMismatch;

    if (isValid) {
      onChange(`${field}.image`, previewImage.target.value);
      setOpenEdit(false);
    } else handleClientError({ message: "Invalid URL!" });
  };

  return (
    <>
      <div className="flex gap-4 mb-8">
        <EditableImage
          onEdit={() => setOpenEdit(!openEdit)}
          src={src}
          className="w-[144px] h-[144px]"
        />
        <div className="w-full flex flex-col gap-4 justify-between">
          <div className="flex items-start gap-1">
            <textarea
              className="border-2 px-2 w-full h-full"
              rows={4}
              placeholder="Description"
              onChange={(e) => {
                onChange(`${field}.description`, e.target.value);
              }}
            />
          </div>
          <div>
            <CButton type="black" onClick={onSave}>
              Lưu
            </CButton>
          </div>
        </div>
      </div>
      <CModal
        onOk={() => {
          handleClickOk();
        }}
        onCancel={() => setOpenEdit(false)}
        title="Config image"
        open={openEdit}
      >
        <div>
          <label htmlFor="">Enter Image URL:</label>
          <CInput
            type="url"
            inputClassName="px-2 p-1"
            placeholder="https://example.com"
            pattern="https://.*"
            onChange={(e) => {
              setPreviewImage(e);
            }}
          />
        </div>
        {(!previewImage?.target?.validity?.patternMismatch || src) && (
          <img src={previewImage.target?.value || src} className="max-w-full" />
        )}
      </CModal>
    </>
  );
});

export default ImageConfigForm;
