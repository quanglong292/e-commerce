import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import "./viewLanding.scss";

import useProductStore from "../../../../../store/product.zustand";
import VideoFrame from "./elements/VideoFrame";
import PopularSection from "./elements/PopularSection";
// import CategorySection from "./elements/CategorySection";s
import SaleSection from "./elements/SaleSection";
import MemberSection from "./elements/MemberSection";
import BigCategory from "./elements/BigCategory";
import SectionHeader from "./elements/SectionHeader";
import CButton from "../../../../../components/core/CButton";
import CategorySection2 from "./elements/CategorySection2";

const ViewLanding = memo(() => {
  const navigate = useNavigate();
  const state = useProductStore((state) => state);

  return (
    <div className="w-full h-full mb-12">
      <VideoFrame />
      <div className="flex flex-col items-center gap-8 mt-24 w-3/5 m-auto">
        <p className="text-center text-6xl font-black">
          THE 2023 NIKE NATIONAL TEAM KITS & COLLECTIONS
        </p>
        <p className="text-center">
          Team pride has never looked so fresh. Show the world what the future
          of football looks like in the 2023 Nike National Team Kit &
          Collections:{" "}
        </p>
        <div className="w-fit">
          <CButton
            onClick={() => navigate("/app/women")}
            className="px-4 rounded-[50px]"
            type="black"
          >
            Shop
          </CButton>
        </div>
      </div>
      <div className="mt-24">
        <SectionHeader>Featured</SectionHeader>
        <div className="flex gap-4 justify-center w-full">
          <BigCategory
            header=""
            buttonText="Discover"
            path="/app/women"
            type="includeButton"
            buttonType="default px-4 rounded-2xl font-semibold bg-white"
            src="https://static.nike.com/a/images/f_auto/dpr_0.8,cs_srgb/w_906,c_limit/d100098a-3fed-4dcb-9695-b0596af84e72/nike-just-do-it.png"
            className="w-[525px] h-[445px]"
          />
          <BigCategory
            header=""
            buttonText="Shop"
            path="/app/kid"
            type="includeButton"
            buttonType="default px-4 rounded-2xl font-semibold bg-white"
            src="https://static.nike.com/a/images/f_auto/dpr_0.8,cs_srgb/w_906,c_limit/f19708e5-4698-4c1d-a6e2-79a562fba1f4/nike-just-do-it.png"
            className="w-[525px] h-[445px]"
          />
        </div>
      </div>
      <PopularSection items={state.allProducts} loading={state.loading} />
      {/* <CategorySection {...state} /> */}
      <div className="mt-24">
        <SectionHeader>Don't miss this</SectionHeader>
        <BigCategory src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_1824,c_limit/b6de205f-c91a-4cb2-b58a-b2bb29080cd0/nike-just-do-it.jpg" />
        <div className="flex flex-col items-center gap-4 mt-4 ">
          <p className=" text-6xl font-black">NIKE INVICIBLE 3</p>
          <p>All the curshion. All the feels</p>
          <div className="w-fit">
            <CButton
              onClick={() => navigate("/app/women")}
              className="px-4 rounded-[50px]"
              type="black"
            >
              Shop
            </CButton>
          </div>
        </div>
      </div>
      <CategorySection2 items={state.categoryGroups} />
      <SaleSection />
      <MemberSection />
    </div>
  );
});

export default ViewLanding;
