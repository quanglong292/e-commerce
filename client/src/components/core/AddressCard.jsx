import React, { memo } from "react";

const AddressCard = ({ children, id, onEdit }) => {
  return (
    <div>
      <input
        id={id}
        value={id}
        className={"hidden peer"}
        type="radio"
        name="AddressSelectBox"
      />
      <label
        for={id}
        className={"block p-4 border-2 peer-checked:border-sky-500 relative"}
      >
        <div className="flex justify-between items-start">
          <div>{children}</div>
        </div>
        <a
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="text-sky-500 absolute top-2 right-3 z-10"
        >
          Edit
        </a>
      </label>
    </div>
  );
};

export default AddressCard;
