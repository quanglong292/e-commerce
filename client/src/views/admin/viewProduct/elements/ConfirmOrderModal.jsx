import { Button, Modal } from "antd";
import React, { useEffect, useState } from "react";
import fetcher from "../../../../utils/helpers/fetcher";
import { REQUEST_PARAMS } from "../../../../utils/constants/urlPath.constant";
import ComponentLoading from "../../../../components/layout/ComponentLoading";
import UserHistory from "../../../app/ViewUser/elements/UserHistory";
import formatPrice from "../../../../utils/helpers/formatPrice";

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
    <Modal
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
                <p key={info.name} className="font-mono font-semibold">
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
      <div className="flex gap-4 mt-4">
        <Button
          onClick={() => onConfirmOrder(null, "order shipped")}
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
    </Modal>
  );
};

export default ConfirmOrderModal;
