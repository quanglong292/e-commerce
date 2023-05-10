import React, { useEffect } from "react";
import ProductCard from "./elements/ProductCard";
import useProductStore from "../../../store/product.zustand";
import { useResolvedPath } from "react-router-dom";
import ComponentLoading from "../../../components/layout/ComponentLoading";

const ViewProducts = () => {
  const { products, loading } = useProductStore((state) => state);

  if (loading) return <ComponentLoading />;

  return (
    <div className="w-full grid grid-cols-2 xl:grid-cols-3 gap-4">
      {!products.length ? (
        <div>No item found!</div>
      ) : (
        products?.map((i) => <ProductCard key={i.id} item={i} />)
      )}
    </div>
  );
};

export default ViewProducts;
