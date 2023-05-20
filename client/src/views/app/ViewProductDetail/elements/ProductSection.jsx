import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSizes } from "../../../../utils/composables/useProduct";
import useProductStore from "../../../../store/product.zustand";
import formatPrice from "../../../../utils/helpers/formatPrice";

const ProductSection = (props) => {
  const { item = {} } = props;
  const { id } = useParams();
  const { products, categories, fetchInitData, fetch } = useProductStore(
    (state) => state
  );
  const product = products.find((i) => i.id === id) ?? {};
  console.log({ product, products, id });

  // Functions

  // Effects
  useEffect(() => {
    if (!categories?.length) fetchInitData();
    if (!products?.length) fetch("all");
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="bg-gray-100 p-2 flex">
      <div className="w-[40%] m-auto">
        <img src={product.bannerImage} alt="" className="mx-auto max-w-full" />
        {/* <div className="cursor-pointer w-fit m-auto">Zoom +</div> */}
        {/* <div className="w-[90%] mx-auto">Slider</div> */}
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

  console.log({ item });

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
      <div className="text-lg mt-6">{formatPrice(item.price)}</div>
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
                  onClick={() => {
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
        onClick={() => handleAddSelectedItems("orderList")}
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
