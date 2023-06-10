import React, { memo } from "react";
import "./viewLanding.scss";

import useProductStore from "../../../../../store/product.zustand";
import VideoFrame from "./elements/VideoFrame";
import PopularSection from "./elements/PopularSection";
import CategorySection from "./elements/CategorySection";
import SaleSection from "./elements/SaleSection";
import MemberSection from "./elements/MemberSection";
import BigCategory from "./elements/BigCategory";
import SectionHeader from "./elements/SectionHeader";
import CButton from "../../../../../components/core/CButton";
import { useNavigate } from "react-router-dom";

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
          />
          <BigCategory
            header=""
            buttonText="Shop"
            path="/app/kid"
            type="includeButton"
            buttonType="default px-4 rounded-2xl font-semibold bg-white"
            src="https://static.nike.com/a/images/f_auto/dpr_0.8,cs_srgb/w_906,c_limit/f19708e5-4698-4c1d-a6e2-79a562fba1f4/nike-just-do-it.png"
          />
        </div>
      </div>
      <PopularSection {...state} />
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
      <div className="mt-24">
        <SectionHeader>The Essentials</SectionHeader>
        <div className="flex justify-center gap-4 w-full">
          <BigCategory
            header=""
            buttonText="Men's"
            path="/app/sale"
            type="includeButton"
            // buttonType="px-4 rounded-[50px]"
            src="https://static.nike.com/a/images/f_auto/dpr_0.8,cs_srgb/w_542,c_limit/e9e24aa0-e6f4-4aa9-aadc-67739c70bb77/jordan.png"
          />
          <BigCategory
            header=""
            buttonText="Women's"
            path="/app/women"
            type="includeButton"
            // buttonType="px-4 rounded-[50px]"
            src="https://static.nike.com/a/images/f_auto/dpr_0.8,cs_srgb/w_542,c_limit/4d00886e-980c-4e26-8e78-9b08615eda96/jordan.png"
          />
          <BigCategory
            header=""
            buttonText="Kid's"
            path="/app/kid"
            type="includeButton"
            // buttonType="px-4 rounded-[50px]"
            src="https://static.nike.com/a/images/f_auto/dpr_0.8,cs_srgb/w_542,c_limit/228adfd4-3a2a-4f6c-b798-1f94330b8f38/jordan.png"
          />
        </div>
      </div>
      <SaleSection />
      <MemberSection />
    </div>
  );
});

export default ViewLanding;
