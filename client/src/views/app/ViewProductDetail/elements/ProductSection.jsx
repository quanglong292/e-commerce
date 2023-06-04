import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSizes } from "../../../../utils/composables/useProduct";
import useProductStore from "../../../../store/product.zustand";
import formatPrice from "../../../../utils/helpers/formatPrice";
import { REQUEST_PARAMS } from "../../../../utils/constants/urlPath.constant";
import fetcher from "../../../../utils/helpers/fetcher";
import CCarousel from "../../../../components/core/CCarousel";

const ProductSection = (props) => {
  const { id } = useParams();
  const { categories, fetchInitData } = useProductStore((state) => state);

  // State
  const [product, setProduct] = useState({});

  // Functions
  const getSaleInfo = (categories, product) => {
    const saleCates = categories.filter((i) =>
      i.name.toLowerCase().includes("sale")
    );
    const saleInfo = saleCates.find((i) => product.category.includes(i.id));
    if (saleInfo) {
      const saleValue = saleInfo.description.split("_")[0];
      if (saleValue.includes("%")) {
        product.salePrice =
          (product.price * Number(saleValue.split("%")[0])) / 100;
      } else product.salePrice = product.price - Number(saleValue);
      product.sale = saleInfo;

      setProduct(product);
    }
  };

  const handleInit = async () => {
    if (!categories?.length) fetchInitData();
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

  useEffect(() => {
    if (categories.length && product.id) getSaleInfo(categories, product);
    console.log({ product });
  }, [categories, product]);

  return (
    <div className="bg-gray-100 p-2 flex">
      <div className="w-[40%] m-auto">
        {product.detailImages?.length ? (
          <CCarousel
            renderItem={(i) => {
              return (
                <img
                  src={i?.value || ""}
                  alt=""
                  className="mx-auto max-w-full"
                />
              );
            }}
            items={product.detailImages.filter((i) => i?.name && i?.value || i)}
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
  );
};

export default ProductSection;

// Sub-components
function DetailSection({ item = {} }) {
  const { categoryGroups, mutateList } = useProductStore((state) => state);
  const category =
    categoryGroups.find((i) => i.id === item?.group?.[0])?.name ?? "";

  const [selected, setSelected] = useState([]);

  function handleSelect(id) {
    const newItem = { id, count: 1, product: item };
    if (!findSelect(id)) return setSelected([...selected, newItem]);
    const map = selected.map((i) =>
      i.id === id ? { ...i, count: i.count + 1 } : i
    );
    setSelected(!selected.length ? [newItem] : map);
  }

  function findSelect(id) {
    return selected.find((i) => i.id === id);
  }

  const handleAddSelectedItems = (type) => {
    setSelected([]);
    mutateList(type, {
      payload: selected,
    });
  };

  return (
    <div className="w-[30%] bg-white p-4">
      <div className="text-2xl font-bold">{item.name}</div>
      <div className="">{`${category}'s`}</div>
      <div className="text-lg mt-6">
        {formatPrice(item.price)}{" "}
        <span className="text-red-500 font-semibold">
          {item?.salePrice ? `--> ${formatPrice(item.salePrice)}` : ""}
        </span>
      </div>
      <div className="text-red-500 font-semibold">
        {item.sale?.description?.split("_")?.[1] || ""}
      </div>
      <div className="text-sm">
        4 interest-free payments of $45.00 with{" "}
        <span className="font-semibold">Klarna</span>.{" "}
        <span className="underline">Learn More</span>
      </div>
      <div className="my-4">
        <div>
          Size: <span className="text-gray-400 mb-2">Please select</span>
        </div>
        <div className="grid grid-cols-6 gap-1 gap-y-3 mt-4 mb-2">
          {getSizes(item.stocks)?.map((i) => (
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
          ))}
        </div>
      </div>
      <div
        onClick={() => handleAddSelectedItems("ordersList")}
        className="bg-black text-white cursor-pointer font-bold uppercase w-full py-2 text-center"
      >
        add to cart
      </div>
      <div
        onClick={() => handleAddSelectedItems("wishList")}
        className="bg-black text-white cursor-pointer font-bold uppercase w-full py-2 text-center my-4"
      >
        add to wish list
      </div>
    </div>
  );
}
