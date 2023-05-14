import React from "react";
import useProductStore from "../../../../store/product.zustand";
import ProductCard from "../../ViewProducts/elements/ProductCard";

const SuggestSection = () => {
  const { products } = useProductStore((state) => state);
  return (
    <div className="border-2 p-4 mt-4">
      <div className="text-2xl font-semibold mb-4">
        Commonly Bought Together
      </div>
      <div className="flex gap-4">
        {products
          ?.filter((_, idx) => idx < 5)
          ?.map((i) => (
            <ProductCard key={i.name} item={i} />
          ))}
      </div>
    </div>
  );
};

export default SuggestSection;
