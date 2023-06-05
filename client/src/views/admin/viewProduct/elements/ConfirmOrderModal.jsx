import { Button, Modal } from "antd";
import React, { useEffect, useState } from "react";
import fetcher from "../../../../utils/helpers/fetcher";
import { REQUEST_PARAMS } from "../../../../utils/constants/urlPath.constant";
import ComponentLoading from "../../../../components/layout/ComponentLoading";
import UserHistory from "../../../app/ViewUser/elements/UserHistory";

const ConfirmOrderModal = (props) => {
  const { visible, item, onCancel, onSubmit } = props;

  // State
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const handleInit = async (item) => {
    setLoading(true);
    const productRes = await fetcher(REQUEST_PARAMS.GET_CART_HISTORY, {
      creator: item.creator,
    });
    setProducts(productRes);
    setLoading(false);
    console.log({ productRes });
  };

  useEffect(() => {
    console.log({item});
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
      {loading ? (
        <ComponentLoading />
      ) : (
        <UserHistory historyList={products} actions={[]} />
      )}
      <div className="flex gap-4 mt-4">
        <Button size="small" type="primary">
          Confirm
        </Button>
        <Button size="small">Close</Button>
      </div>
    </Modal>
  );
};

export default ConfirmOrderModal;
