import React, { lazy, useState } from "react";
import CButton from "../../../../components/core/CButton";
import { useNavigate } from "react-router-dom";
import formatPrice from "../../../../utils/helpers/formatPrice";
import { HeartTwoTone } from "@ant-design/icons";
import useProductStore from "../../../../store/product.zustand";
import useGlobalStore from "../../../../store/global.zustand";
import { notification } from "antd";

const QuickViewCard = lazy(() => import("./QuickViewCard"));

const ProductCard = (props) => {
  const { item } = props;
  const navigate = useNavigate();
  const { mutateList, wishList } = useProductStore((state) => state);
  const { checkToken } = useGlobalStore((state) => state);
  const [isHover, setHover] = useState(false);
  const [quickViewId, setQuickViewId] = useState(null);

  function toggle({ type }) {
    setHover(!(type === "mouseleave"));
  }

  const handleAddWishList = (item) => {
    if (!checkToken()) {
      notification.warning({
        key: 1,
        placement: "bottomLeft",
        message: (
          <a onClick={() => navigate("/auth/app")} className="underline">
            Please login! (click)
          </a>
        ),
      });
      return;
    }

    const firstSize = item.stocks[0].name;
    let updatingList = wishList;
    const names = updatingList.map((i) => i.product.name);
    const isExist = names.includes(item.name);

    if (isExist) {
      updatingList = updatingList.filter((i) => i.product.name !== item.name);
    } else {
      updatingList = [
        ...updatingList,
        {
          count: 1,
          id: firstSize,
          product: item,
        },
      ];
    }

    mutateList("wishList", {
      payload: updatingList,
    });
  };

  return (
    <>
      <div className="w-full relative">
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
        {/* Heart icon */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            handleAddWishList(item);
          }}
          className="absolute top-1 right-2 z-50 cursor-pointer"
        >
          <HeartTwoTone
            twoToneColor={
              wishList.find((i) => i.product?.name === item.name)
                ? "#cf1537"
                : "#c7c5c5"
            }
          />
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
