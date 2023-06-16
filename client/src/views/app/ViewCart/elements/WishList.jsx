import React from "react";
import SectionHeader from "../../ViewProducts/elements/ViewLanding/elements/SectionHeader";
import useProductStore from "../../../../store/product.zustand";
import formatPrice from "../../../../utils/helpers/formatPrice";
import CButton from "../../../../components/core/CButton";

const WishList = () => {
  // Store
  const wishList = useProductStore((state) => state.wishList);

  return (
    <div className="mt-24">
      <SectionHeader>Favourites</SectionHeader>
      <section className="grid grid-cols-2 gap-12 mt-8">
        {wishList.map((i, idx) => (
          <CardItem key={idx} item={i} />
        ))}
      </section>
    </div>
  );
};

function CardItem({ item }) {
  const { product } = item;
  return (
    <div className="flex gap-4">
      <img src={product.bannerImage} className="max-w-[30%] pr-2" />
      <div className="flex flex-col gap-2 w-[70%]">
        <div className="flex justify-between font-semibold">
          <p>{product.name}</p>
          <p>{formatPrice(product.price)}</p>
        </div>
        <p className="text-gray-500">
          {product.shortName || "Sub name product"}
        </p>
        <CButton type="default rounded-2xl font-semibold bg-white w-fit">
          Add to bag
        </CButton>
      </div>
    </div>
  );
}

export default WishList;
