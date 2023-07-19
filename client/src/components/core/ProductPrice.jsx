import React, { memo } from "react";
import formatPrice from "../../utils/helpers/formatPrice";

const ProductPrice = memo(({ item }) => {
  return (
    <div className="text-lg flex gap-2">
      <span className={item?.finalPrice !== item?.price ? "line-through" : ""}>
        {formatPrice(item.price)}
      </span>
      <span className="text-red-500 font-semibold">
        {item?.finalPrice !== item?.price
          ? `-> ${formatPrice(item?.finalPrice)}`
          : ""}
      </span>
    </div>
  );
});

export default ProductPrice;
