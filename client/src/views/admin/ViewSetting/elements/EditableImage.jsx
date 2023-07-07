import React, { memo } from "react";
import CButton from "../../../../components/core/CButton";

const EditableImage = memo(({ src, className, onEdit }) => {
  return (
    <div
      className={
        "group border-2 rounded-lg flex justify-center items-center relative " +
        className
      }
    >
      <img src={src} className="max-w-full" />
      <div className="w-full h-full bg-slate-500/50 absolute z-10 hidden group-hover:flex justify-center items-center">
        <CButton type="primary" className="" onClick={onEdit}>
          Edit
        </CButton>
      </div>
    </div>
  );
});

export default EditableImage;
