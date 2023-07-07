import React from "react";
import SectionHeader from "../ViewProducts/elements/ViewLanding/elements/SectionHeader";
import useProductStore from "../../../store/product.zustand";
import CardItem from "./elements/CardItem";

const ViewWishList = () => {
  const wishList = useProductStore((state) => state.wishList);

  return (
    <div>
      <SectionHeader>Favourites</SectionHeader>
      <section className="grid grid-cols-4 gap-12 mt-8">
        {wishList.length ? (
          wishList.map((i, idx) => <CardItem key={idx} item={i} />)
        ) : (
          <p className="text-sm text-gray-500 font-semibold">No item found!</p>
        )}
      </section>
    </div>
  );
};

export default ViewWishList;
