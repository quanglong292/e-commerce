import React from "react";
import SectionHeader from "../../ViewProducts/elements/ViewLanding/elements/SectionHeader";
import useProductStore from "../../../../store/product.zustand";
import formatPrice from "../../../../utils/helpers/formatPrice";
import CButton from "../../../../components/core/CButton";
import { DeleteOutlined } from "@ant-design/icons";


const WishList = () => {
  // Store
  const wishList = useProductStore((state) => state.wishList);

  return (
    <div className="mt-24">
      <SectionHeader>Favourites</SectionHeader>
      <section className="grid grid-cols-2 gap-12 mt-8">
        {wishList.length ? (
          wishList.map((i, idx) => <CardItem key={idx} item={i} />)
        ) : (
          <p className="text-sm text-gray-500 font-semibold">No item found!</p>
        )}
      </section>
    </div>
  );
};

export function CardItem({ item, type = "" }) {
  const { product } = item;
  const { wishList, mutateList } = useProductStore((state) => state);

  const handleRemoveWishList = () => {
    const payload = wishList.filter(
      (i) => i.product.name !== item.product.name
    );
    mutateList("wishList", { payload });
  };

  const handleBuyWishItem = () => {
    mutateList("ordersList", {
      payload: [item],
    });
    handleRemoveWishList(item);
  };
  
  return (
    <div className={"flex gap-4 " + (type === "horizontal" ? "" : "flex-col")}>
      <img src={product.bannerImage} className="max-w-[30%] pr-2" />
      <div className="flex flex-col gap-2 w-[70%]">
        <div className="flex justify-between font-semibold">
          <p>{product.name}</p>
          <p>{formatPrice(product.price)}</p>
        </div>
        <p className="text-gray-500">
          {product.shortName || "Sub name product"}
        </p>
        <div className="flex justify-between">
          <CButton
            onClick={handleBuyWishItem}
            type="default rounded-2xl font-semibold bg-white w-fit mt-2"
          >
            Add to bag
          </CButton>
          <DeleteOutlined
            onClick={handleRemoveWishList}
            className="text-red-500 cursor-pointer"
          />
        </div>
        {/* <CButton
          onClick={handleBuyWishItem}
          type="default rounded-2xl font-semibold bg-white w-fit"
        >
          Add to bag
        </CButton> */}
      </div>
    </div>
  );
}

export default WishList;
