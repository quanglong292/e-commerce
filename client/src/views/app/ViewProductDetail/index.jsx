import React, { memo } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Components
import ProductSection from "./elements/ProductSection";
import AdditionInfoSection from "./elements/AdditionInfoSection";
import SuggestSection from "./elements/SuggestSection";

const ViewProductDetail = memo(() => {
  const { id } = useParams();
  const navigate = useNavigate();
  if (!id) navigate(-1);

  return (
    <div className="flex flex-col gap-4 max-w-[1440px]">
      <ProductSection />
      <AdditionInfoSection />
      <SuggestSection />
      {/* <Footer /> */}
    </div>
  );
});

export default ViewProductDetail;
