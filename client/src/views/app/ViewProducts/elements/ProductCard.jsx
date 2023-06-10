import React, { lazy, useState } from "react";
import CButton from "../../../../components/core/CButton";
import { useNavigate } from "react-router-dom";
import formatPrice from "../../../../utils/helpers/formatPrice";

const QuickViewCard = lazy(() => import("./QuickViewCard"));

const ProductCard = (props) => {
  const { item } = props;
  const navigate = useNavigate();
  // const item = cloneItem
  const [isHover, setHover] = useState(false);
  const [quickViewId, setQuickViewId] = useState(null);

  function toggle({ type }) {
    setHover(!(type === "mouseleave"));
  }

  return (
    <>
      <div className="w-full">
        <div
          onMouseEnter={toggle}
          onMouseLeave={(e) => toggle(e)}
          className="w-full relative"
        >
          <img
            width={300}
            height={250}
            src={item.bannerImage}
            className="w-[300px] h-[250px] mx-auto rounded-md hover:bg-slate-300 cursor-pointer relative object-contain"
          />
          {isHover && (
            <div className="w-full h-full absolute top-0 left-0 bg-slate-300/50 rounded-md">
              <div className="w-full h-full flex flex-col justify-center items-center gap-2">
                <CButton
                  type="primary"
                  className="w-[114px]"
                  onMouseEnter={toggle}
                  onClick={() => navigate(`/app/product/detail/${item.id}`)}
                >
                  Detail
                </CButton>
                <CButton
                  type="primary"
                  className="w-[114px]"
                  onMouseEnter={toggle}
                  onClick={() => setQuickViewId(item.id)}
                >
                  Quick view
                </CButton>
              </div>
            </div>
          )}
        </div>
        <div className="w-full mt-2">
          <p className="font-semibold">{item.name}</p>
          <div className="flex gap-2 items-end">
            {item?.finalPrice !== item.price ? (
              <p className="uppercase text-red-500 font-semibold">
                SALE: {formatPrice(item.finalPrice)}
              </p>
            ) : (
              <p>{formatPrice(item.price)}</p>
            )}
            <p>-</p>
            <p
              className={
                "italic text-sm " +
                (item.available ? "text-green-500" : "text-yellow-500")
              }
            >
              {item.available ? "Available" : "Out of stock"}
            </p>
          </div>
        </div>
      </div>
      {quickViewId && (
        <QuickViewCard
          item={item}
          isShow={quickViewId}
          onCancel={() => setQuickViewId(null)}
        />
      )}
    </>
  );
};

export default ProductCard;
