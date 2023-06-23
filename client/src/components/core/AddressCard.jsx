import React, { memo } from "react";

const AddressCard = ({ children, id }) => {
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
        className={"block p-4 border-2 peer-checked:border-sky-500"}
      >
        <div className="flex justify-between items-start">
          <div>{children}</div>
          <a className="text-sky-500">Edit</a>
        </div>
      </label>
    </div>
  );
};

export default AddressCard;
