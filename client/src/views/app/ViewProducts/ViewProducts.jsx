import React, { useEffect, useMemo } from "react";
import SHOE_ITEMS from "../../../utils/constants/shoes.constant.json";
import ProductCard from "./elements/ProductCard";
import { useResolvedPath, useSearchParams } from "react-router-dom";
import useProductStore from "../../../store/product.zustand";

const ViewProducts = () => {
  const { pathname, search } = useResolvedPath();
  let [searchParams, setSearchParams] = useSearchParams();
  const productStore = useProductStore(state => state)
  const filterItems = useMemo(() => {
    return {
      ...SHOE_ITEMS,
      sneakers: SHOE_ITEMS.sneakers.filter((i, idx) =>
        i.gender.includes(pathname.split("/")[2]) && idx < 15
      ),
    };
  }, [pathname]);

  useEffect(() => {
    console.log("productStore", productStore);
    if (!productStore.products.length) productStore.fetch()
  }, [])

  return (
    <div className="w-full grid grid-cols-2 xl:grid-cols-3 gap-4">
      {!filterItems.sneakers.length ? (
        <div>No item found! Please checkout other views (Men, Women).</div>
      ) : (
        productStore?.products.map((i) => <ProductCard key={i.id} item={i} />)
      )}
    </div>
  );
};

export default ViewProducts;
