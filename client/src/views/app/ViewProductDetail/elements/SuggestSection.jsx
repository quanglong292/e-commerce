import React from "react";
import useProductStore from "../../../../store/product.zustand";
import ProductCard from "../../ViewProducts/elements/ProductCard";
import { useParams } from "react-router-dom";

const SuggestSection = () => {
  const allProducts = useProductStore((state) => state.allProducts);
  const { id } = useParams();
  return (
    <div className="border-2 p-4 mt-4">
      <div className="text-2xl font-semibold mb-4">
        Commonly Bought Together
      </div>
      <div className="flex gap-4">
        {allProducts
          ?.filter((_, idx) => idx < 5)
          ?.filter((i) => i.id !== id)
          ?.map((i) => (
            <ProductCard key={i.name} item={i} />
          ))}
      </div>
    </div>
  );
};

export default SuggestSection;
