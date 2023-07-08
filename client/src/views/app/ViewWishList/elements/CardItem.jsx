import { memo } from "react";
import formatPrice from "../../../../utils/helpers/formatPrice";
import CButton from "../../../../components/core/CButton";
import { DeleteOutlined } from "@ant-design/icons";
import useProductStore from "../../../../store/product.zustand";

function CardItem({ item }) {
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
    <div className="flex gap-4 flex-col">
      <img src={product.bannerImage} className="max-w-full pr-2" />
      <div className="flex flex-col w-full">
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
      </div>
    </div>
  );
}

export default memo(CardItem);
