import React from "react";
import SectionHeader from "./SectionHeader";
import CButton from "../../../../../../components/core/CButton";
import { useNavigate } from "react-router-dom";

const SALE_BANNER =
  "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_1824,c_limit/9e83666e-b2bd-40c2-af70-7cc42b2beb3c/nike-just-do-it.jpg";

const SaleSection = ({
  header = "Sale",
  banner = SALE_BANNER,
  buttonText = "Shop",
  path = "/app/sale",
}) => {
  const navigate = useNavigate();

  return (
    <div className="mt-24">
      <SectionHeader>{header}</SectionHeader>
      <div className="w-full relative">
        <img src={banner} className="max-w-full" />
        <div className="absolute bottom-4 left-4">
          <CButton onClick={() => navigate(path)} className="px-4 rounded-[50px]" type="black">
            {buttonText}
          </CButton>
        </div>
      </div>
    </div>
  );
};

export default SaleSection;
