import { Modal, notification } from "antd";
import React, { memo, useState } from "react";
import "./cardModal.scss";
import CButton from "../../../../components/core/CButton";
import useProductStore from "../../../../store/product.zustand";
import { getSizes } from "../../../../utils/composables/useProduct";
import useGlobalStore from "../../../../store/global.zustand";
import CModal from "../../../../components/core/CModal";

const QuickViewCard = memo((props) => {
  const { item, isShow, onCancel } = props;
  const { mutateList, categoryGroups } = useProductStore((state) => state);
  const { checkToken, setting } = useGlobalStore((state) => state);

  const category =
    categoryGroups.find((i) => i.id === item?.group?.[0])?.name ?? "";

  // local state
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
    if (!checkToken()) {
      notification.warning({
        key: 1,
        placement: "bottomLeft",
        message: "Please login!",
      });
      return;
    }
    setSelected([]);
    mutateList(type, {
      payload: selected,
    });
  };

  return (
    <CModal
      open={Boolean(isShow)}
      onCancel={onCancel}
      footer={<></>}
      width="80%"
      className="quick-view-card max-w-[1600px] p-0"
    >
      <div className="w-full h-full p-4 lg:flex">
        <div className="h-1/2 lg:h-auto lg:w-1/2 flex justify-center p-4">
          <img
            src={item.bannerImage}
            className="object-contain lg:rounded-l-md"
          />
        </div>
        <div className="max-h-1/2 overflow-y-auto lg:h-auto lg:w-1/2 p-3">
          <h1 className="text-2xl font-bold">{item.name}</h1>
          <div className="">{`${category}'s`}</div>
          <h3 className="text-base">{item.shortName}</h3>
          <h3 className="text-base mt-2">
            {new Intl.NumberFormat("en-IN", {
              maximumFractionDigits: 0,
              currency: "USD",
              style: "currency",
            }).format(item.price)}
          </h3>
          <div className="text-sm mt-4">
            4 interest-free payments of $45.00 with{" "}
            <span className="font-semibold">Klarna</span>.{" "}
            <span className="underline">Learn More</span>
          </div>
          <div className="mt-4 text font-semibold">
            <div className="mb-4">
              Size: <span className="text-gray-400">Please select</span>
            </div>
            <a href={setting?.sizeChart} target="_blank" className="underline">Size chart</a>
            <div className="grid grid-cols-6 gap-1 gap-y-3">
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
          <div className="mt-4 flex gap-2 justify-end">
            <CButton>Add to cart</CButton>
            <CButton
              type="black"
              onClick={() => {
                handleAddSelectedItems("ordersList");
              }}
            >
              Add to cart: {selected.reduce((a, b) => a + b.count, 0)}
            </CButton>
            <CButton
              onClick={() => {
                handleAddSelectedItems("wishList");
              }}
              type="black"
            >
              Add to whish list
            </CButton>
          </div>
        </div>
      </div>
    </CModal>
  );
});

export default QuickViewCard;
