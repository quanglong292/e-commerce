import React, { memo } from "react";
import "./viewLanding.scss"

import useProductStore from "../../../../../store/product.zustand";
import VideoFrame from "./elements/VideoFrame";
import PopularSection from "./elements/PopularSection";
import CategorySection from "./elements/CategorySection";
import SaleSection from "./elements/SaleSection";
import MemberSection from "./elements/MemberSection";

const ViewLanding = memo(() => {
  const state = useProductStore((state) => state);

  return (
    <div className="w-full h-full mb-12">
      <VideoFrame />
      <PopularSection {...state} />
      <CategorySection {...state} />
      <SaleSection />
      <MemberSection />
    </div>
  );
});

export default ViewLanding;
