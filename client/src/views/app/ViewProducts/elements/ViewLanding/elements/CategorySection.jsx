import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import CCarousel from "../../../../../../components/core/CCarousel";
import SectionHeader from "./SectionHeader";

const random = () => Math.floor(Math.random() * 16777215).toString(16);

const CategorySection = (props) => {
  const navigate = useNavigate();
  const { categoryGroups } = props;

  const mappedGroups = useMemo(
    () => categoryGroups.map((i) => ({ ...i })),
    [categoryGroups]
  );

  return (
    <div className="mt-24">
      <SectionHeader>category</SectionHeader>
      <CCarousel
        renderItem={(i) => {
          return (
            <div
              onClick={() => navigate(`/app/${i.name.toLowerCase()}`)}
              className={
                "w-full h-[75px] rounded-md cursor-pointer flex justify-center items-center font-semibold text-white uppercase"
              }
              style={{
                background: `linear-gradient(45deg, #${random()} 0%, #${random()} 35%, #${random()} 100%)`,
              }}
            >
              {i.name}
            </div>
          );
        }}
        items={mappedGroups}
        responsive={[4, 2, 2]}
      />
    </div>
  );
};

export default CategorySection;
