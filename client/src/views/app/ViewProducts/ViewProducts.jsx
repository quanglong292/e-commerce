import React, { useMemo } from "react";
import SHOE_ITEMS from "../../../utils/constants/shoes.constant.json";
import ProductCard from "./elements/ProductCard";
import { useResolvedPath } from "react-router-dom";

const ViewProducts = () => {
  // console.log("ITEMS", SHOE_ITEMS);
  const { pathname } = useResolvedPath();
  console.log(
    "🚀 ~ file: ViewProducts.jsx:9 ~ ViewProducts ~ pathname:",
    pathname
  );
  const filterItems = useMemo(() => {
    return {
      ...SHOE_ITEMS,
      sneakers: SHOE_ITEMS.sneakers.filter((i) =>
        i.gender.includes(pathname.split("/")[2])
      ),
    };
  }, [pathname]);
  console.log(
    "🚀 ~ file: ViewProducts.jsx:10 ~ filterItems ~ filterItems:",
    filterItems
  );

  return (
    <div className="w-full grid grid-cols-3 gap-4">
      {!filterItems.sneakers.length ? (
        <div>No item found!</div>
      ) : (
        filterItems.sneakers.map((i) => <ProductCard key={i.id} item={i} />)
      )}
    </div>
  );
};

export default ViewProducts;
