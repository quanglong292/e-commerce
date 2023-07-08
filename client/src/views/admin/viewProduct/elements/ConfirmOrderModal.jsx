import { Button, Modal } from "antd";
import React, { useEffect, useState } from "react";
import fetcher from "../../../../utils/helpers/fetcher";
import { REQUEST_PARAMS } from "../../../../utils/constants/urlPath.constant";
import ComponentLoading from "../../../../components/layout/ComponentLoading";
import UserHistory from "../../../app/ViewUser/elements/UserHistory";
import formatPrice from "../../../../utils/helpers/formatPrice";
import CInput from "../../../../components/core/CInput";
import CModal from "../../../../components/core/CModal";

const ConfirmOrderModal = (props) => {
  const { visible, item, onCancel, onConfirmOrder } = props;

  // State
  const [products, setProducts] = useState([]);

  const handleInit = async (item) => {
    setProducts(item.products);
  };

  useEffect(() => {
    if (item) handleInit(item);

    return () => {
      setProducts([]);
    };
  }, [item]);

  return (
    <CModal
      title={"Confirm order"}
      open={visible}
      footer={<></>}
      centered
      onCancel={onCancel}
    >
      <div>
        {products?.map((i) => {
          const { info } = i;
          return (
            <div key={info.name} className="flex gap-4 pb-4 border-b-2">
              <img src={info.image} className="max-w-[20%]" />
              <div>
                <p key={info.name} className=" font-semibold">
                  {info.name}
                </p>
                <p>
                  Size: {i.value} - Quantity: {i.amount} - Price:{" "}
                  {formatPrice(info.price)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      {item?.isWholeSale && (
        <div className="my-4">
          <section className="pb-4 border-b-2">
            <div className="flex items-center justify-between">
              <label htmlFor="fixPrice" className="min-w-fit font-semibold">
                Origin Total:
              </label>
              <div className="w-1/2 flex gap-2 items-center">
                {formatPrice(100)}
              </div>
            </div>
            <div className="flex items-center justify-between my-2">
              <label htmlFor="fixPrice" className="min-w-fit font-semibold">
                Fix price:
              </label>
              <div className="w-1/2 flex gap-2 items-center">
                <span>₫</span>
                <CInput
                  id="fixPrice"
                  type="number"
                  min={1000}
                  className="pb-0"
                  inputClassName="px-2 py-1"
                  style={{ padding: 0 }}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="fixPrice" className="min-w-fit font-semibold">
                After Fix:
              </label>
              <div className="w-1/2 flex gap-2 items-center">
                {formatPrice(100)}
              </div>
            </div>
          </section>
        </div>
      )}
      <div className="flex gap-4 mt-4">
        <Button
          onClick={() => onConfirmOrder(null, "shipping")}
          size="small"
          type="primary"
        >
          Confirm
        </Button>
        <Button
          onClick={() => onConfirmOrder(null, "cancel")}
          size="small"
          type="primary"
          danger
        >
          Cancel
        </Button>
        <Button onClick={onCancel} size="small">
          Close
        </Button>
      </div>
    </CModal>
  );
};

export default ConfirmOrderModal;
