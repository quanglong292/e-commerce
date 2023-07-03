import React from "react";
import { useNavigate } from "react-router-dom";
import CButton from "../../../../../../components/core/CButton";

const BigCategory = ({
  src,
  buttonText = "Shop",
  path = "/app/sale",
  type,
  buttonType = "black",
  className = "",
}) => {
  const navigate = useNavigate();
  if (type === "includeButton") {
    return (
      <div className="w-fit relative">
        <div className={"w-[434px] h-[431px] " + className}>
          {src ? (
            <img src={src} className="max-w-full h-full" />
          ) : (
            <div className="min-w-full min-h-full bg-gray-300"></div>
          )}
        </div>
        <div className="absolute bottom-4 left-4">
          <CButton
            className="px-4 rounded-[50px]"
            onClick={() => navigate(path)}
            type={buttonType}
          >
            {buttonText}
          </CButton>
        </div>
      </div>
    );
  }

  return <img src={src} className="max-w-full" />;
};

export default BigCategory;
