import React, { memo } from "react";
import CCarousel from "../../../../../../components/core/CCarousel";
import SectionHeader from "./SectionHeader";

const PopularSection = ({ items, loading }) => {
  return (
    <div className="mt-24">
      <SectionHeader>Popular right now</SectionHeader>
      {loading ? (
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
      )}
    </div>
  );
};

export default memo(PopularSection);
