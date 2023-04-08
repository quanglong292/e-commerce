import React, { useMemo } from "react";
import SHOE_ITEMS from "../../../utils/constants/shoes.constant.json";
import ProductCard from "./elements/ProductCard";
import { useResolvedPath } from "react-router-dom";

const ViewProducts = () => {
  const { pathname } = useResolvedPath();
  const filterItems = useMemo(() => {
    return {
      ...SHOE_ITEMS,
      sneakers: SHOE_ITEMS.sneakers.filter((i, idx) =>
        i.gender.includes(pathname.split("/")[2]) && idx < 15
      ),
    };
  }, [pathname]);

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
