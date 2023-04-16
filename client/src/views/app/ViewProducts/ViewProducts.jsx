import React, { useEffect } from "react";
import ProductCard from "./elements/ProductCard";
import useProductStore from "../../../store/product.zustand";

const ViewProducts = () => {
  const { products, fetch } = useProductStore((state) => state);

  useEffect(() => {
    if (!products.length) fetch();
  }, []);

  return (
    <div className="w-full grid grid-cols-2 xl:grid-cols-3 gap-4">
      {!products.length ? (
        <div>No item found! Please checkout other views (Men, Women).</div>
      ) : (
        products.map((i) => <ProductCard key={i.id} item={i} />)
      )}
    </div>
  );
};

export default ViewProducts;
