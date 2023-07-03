import React, { memo } from "react";
import SectionHeader from "./SectionHeader";
import BigCategory from "./BigCategory";

const CategorySection2 = memo(({ items }) => {
  return (
    <div className="mt-24">
      <SectionHeader>The Essentials</SectionHeader>
      <div className="flex justify-center gap-4 w-full">
        {items?.map((item, i) => {
          if (i >= 3) return <></>;
          return (
            <BigCategory
              buttonText={item.name + "'s"}
              path={`/app/${item.name.toLowerCase()}`}
              key={item.id}
              src={item?.imageUrl ?? ""}
              alt=""
              type="includeButton"
            />
          );
        })}
      </div>
    </div>
  );
});

export default CategorySection2;
