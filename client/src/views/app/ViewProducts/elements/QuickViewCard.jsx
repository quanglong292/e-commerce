import { Modal } from "antd";
import React, {
  memo,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import "./cardModal.scss";
import CButton from "../../../../components/core/CButton";
import StoreContext, { useStore } from "../../../../store";
import { ORDER_WISH_ACTION_TYPES } from "../../../../store/types";

const QuickViewCard = memo((props) => {
  const { item, isShow, onCancel } = props;
  const { storeState, dispatch } = useStore();

  // local state
  const [selected, setSelected] = useState([]);

  function handleSelect(id) {
    const newItem = { id, count: 1 };
    if (!findSelect(id)) return setSelected([...selected, newItem]);
    const map = selected.map((i) =>
      i.id === id ? { ...i, count: i.count + 1 } : i
    );
    setSelected(!selected.length ? [newItem] : map);
  }

  function findSelect(id) {
    return selected.find((i) => i.id === id);
  }

  return (
    <Modal
      open={Boolean(isShow)}
      onCancel={onCancel}
      footer={<></>}
      width="80%"
      className="max-w-[80%] p-0"
    >
      <div className="w-full h-full lg:flex">
        <div className="h-1/2 lg:h-auto lg:w-1/2 flex justify-center bg-gray-200">
          <img
            src={item.main_picture_url}
            className="max-w-full lg:rounded-l-md"
          />
        </div>
        <div className="max-h-1/2 overflow-y-auto lg:h-auto lg:w-1/2 p-3">
          <h1 className="text-xl font-semibold">{item.name}</h1>
          <h3 className="text-base">{item.designer}</h3>
          <h3 className="text-base mt-2">
            {new Intl.NumberFormat("en-IN", {
              maximumFractionDigits: 0,
              currency: "USD",
              style: "currency",
            }).format(item.retail_price_cents)}
          </h3>
          <div className="mt-4 text font-semibold">
            <p className="mb-3">Select size</p>
            <div className="grid grid-cols-6 gap-1 gap-y-3">
              {item.size_range.map((i) => (
                <div
                  key={i}
                  className="p-2 rounded-lg border-[1px] flex justify-center hover:bg-slate-50 cursor-pointer relative"
                  onClick={() => handleSelect(i)}
                >
                  {i}
                  {findSelect(i) && (
                    <div
                      onClick={() => {
                        setSelected(selected.filter((i) => i.id !== i));
                      }}
                      className="absolute top-[-12px] right-[-4px] bg-red-400 w-[24px] h-[24px] flex justify-center items-center rounded-full text-white hover:bg-red-300 z-20"
                    >
                      {findSelect(i)?.count}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 flex gap-2 justify-end">
            <CButton>Add to cart</CButton>
            <CButton
              type="primary"
              onClick={() => {
                setSelected([]);
                dispatch({
                  type: ORDER_WISH_ACTION_TYPES.ADD_ORDER,
                  payload: selected,
                });
              }}
            >
              Add to cart: {selected.reduce((a, b) => a + b.count, 0)}
            </CButton>
            <CButton
              onClick={() => {
                setSelected([]);
                dispatch({
                  type: ORDER_WISH_ACTION_TYPES.ADD_WISH,
                  payload: selected,
                });
              }}
              type="primary"
            >
              Add to whish list
            </CButton>
          </div>
        </div>
      </div>
    </Modal>
  );
});

export default QuickViewCard;
