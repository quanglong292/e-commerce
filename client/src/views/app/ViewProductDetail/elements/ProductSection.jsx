import React, { useEffect, useMemo, useState } from "react";
import { useParams, useResolvedPath } from "react-router-dom";
import { getSizes } from "../../../../utils/composables/useProduct";
import useProductStore from "../../../../store/product.zustand";
import formatPrice from "../../../../utils/helpers/formatPrice";
import { REQUEST_PARAMS } from "../../../../utils/constants/urlPath.constant";
import fetcher from "../../../../utils/helpers/fetcher";
import CCarousel from "../../../../components/core/CCarousel";
import CButton from "../../../../components/core/CButton";
import BreadCrum from "../../../../components/core/BreadCrum";
import useGlobalStore from "../../../../store/global.zustand";
import { notification } from "antd";

const ProductSection = () => {
  const { pathname } = useResolvedPath();
  const { id } = useParams();

  // State
  const [product, setProduct] = useState({});

  const breadCrumItems = useMemo(() => {
    const raw =
      pathname.split("/").map((i) => ({ title: i.toUpperCase() })) ?? [];
    if (raw.length) {
      raw[4] = { title: product.name };
    }
    return raw;
  }, [pathname, product]);

  const handleInit = async () => {
    const productData = await fetcher(REQUEST_PARAMS.GET_PRODUCT, { id });

    if (productData) setProduct(productData[0]);
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    handleInit();
  }, [id]);

  return (
    <>
      <BreadCrum items={breadCrumItems} />
      <div className="bg-gray-100 p-2 flex">
        <div className="w-[40%] m-auto">
          {product.detailImages?.length ? (
            <CCarousel
              renderItem={(i) => {
                return (
                  <img
                    src={i?.name || ""}
                    alt=""
                    className="mx-auto max-w-full"
                  />
                );
              }}
              items={product.detailImages.filter(
                (i) => (i?.name && i?.value) || i
              )}
              responsive={[1, 1, 1]}
            />
          ) : (
            <img
              src={product.bannerImage}
              alt=""
              className="mx-auto max-w-full"
            />
          )}
        </div>
        <DetailSection item={product} />
      </div>
    </>
  );
};

export default ProductSection;

// Sub-components
function DetailSection({ item = {} }) {
  const { categoryGroups, mutateList } = useProductStore((state) => state);
  const { checkToken, setting } = useGlobalStore((state) => state);
  const category =
    categoryGroups.find((i) => i.id === item?.group?.[0])?.name ?? "";

  const [selected, setSelected] = useState([]);

  function handleSelect(id) {
    const selectedCount = selected.find((i) => item.id === i.product.id)?.count;
    const stockLimit = Number(
      item.stocks.find((i) => i.name === id)?.value ?? 0
    );
    const isOutOfStock = selectedCount === stockLimit;

    if (isOutOfStock) return;

    const newItem = { id, count: 1, product: item };
    if (!findSelect(id)) return setSelected([...selected, newItem]);
    setSelected(
      !selected.length
        ? [newItem]
        : selected.map((i) => (i.id === id ? { ...i, count: i.count + 1 } : i))
    );
  }

  function findSelect(id) {
    return selected.find((i) => i.id === id);
  }

  const handleAddSelectedItems = (type) => {
    if (!checkToken()) {
      notification.warning({
        key: 1,
        placement: "bottomLeft",
        message: <a>Please login!</a>,
      });
      return;
    }
    setSelected([]);
    mutateList(type, {
      payload: selected,
    });
  };

  return (
    <div className="w-[30%] bg-white p-4">
      <div className="text-2xl font-bold">{item.name}</div>
      <div className="">{`${category}'s`}</div>
      <div className="text-lg mt-6 flex gap-2">
        <span
          className={item?.finalPrice !== item?.price ? "line-through" : ""}
        >
          {formatPrice(item.price)}
        </span>
        <span className="text-red-500 font-semibold">
          {item?.finalPrice !== item?.price
            ? `-> ${formatPrice(item?.finalPrice)}`
            : ""}
        </span>
      </div>
      <div className="text-red-500 font-semibold">{item?.saleInfo?.title}</div>
      <div className="text-sm">
        4 interest-free payments of $45.00 with{" "}
        <span className="font-semibold">Klarna</span>.{" "}
        <span className="underline">Learn More</span>
      </div>
      <div className="my-4">
        <div>
          Size: <span className="text-gray-400 mb-2">Please select</span>
        </div>
        <a href={setting?.sizeChart} target="_blank" className="underline">Size chart</a>
        <div className="grid grid-cols-6 gap-1 gap-y-3 mt-4 mb-2">
          {getSizes(item.stocks)?.map((i) => {
            if (Number(i.value))
              return (
                <div
                  key={i.id}
                  className="p-2 rounded-lg border-[1px] flex justify-center hover:bg-slate-50 cursor-pointer relative"
                  onClick={() => handleSelect(i.id)}
                >
                  {i.name}
                  {findSelect(i.id) && (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelected(selected.filter((j) => j.id !== i.id));
                      }}
                      className="absolute top-[-12px] right-[-4px] bg-red-400 w-[24px] h-[24px] flex justify-center items-center rounded-full text-white hover:bg-red-300 z-20"
                    >
                      {findSelect(i.id)?.count}
                    </div>
                  )}
                </div>
              );
          })}
        </div>
      </div>
      <CButton
        type="black"
        className="mb-2"
        onClick={() => handleAddSelectedItems("ordersList")}
      >
        add to cart
      </CButton>
      <CButton
        type="black"
        className=""
        onClick={() => handleAddSelectedItems("wishList")}
      >
        add to wish list
      </CButton>
    </div>
  );
}
