import React, { memo } from "react";
import CCarousel from "../../../../../../components/core/CCarousel";
import SectionHeader from "./SectionHeader";
import ProductCard from "../../ProductCard";

const PopularSection = ({ items }) => {
  return (
    <div className="mt-24">
      <SectionHeader>Popular right now</SectionHeader>
      {/* {loading ? (
        "..."
      ) : (
        <CCarousel
          renderItem={(i) => (
            <div
              onClick={() => navigate("/app/women")}
              className="w-[200px] h-[250px] rounded-md cursor-pointer flex justify-center items-center m-auto"
            >
              <img
                src={i.bannerImage}
                alt=""
                className="max-w-full object-contain"
              />
            </div>
          )}
          items={items?.filter((i, idx) => idx < 5)}
        />
      )} */}
      <div className="flex gap-4">
        {items
          ?.filter((_, idx) => idx < 4)
          ?.map((i) => (
            <ProductCard key={i.name} item={i} />
          ))}
      </div>
    </div>
  );
};

export default memo(PopularSection);
