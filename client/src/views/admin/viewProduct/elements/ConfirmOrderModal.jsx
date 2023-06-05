import { Modal } from "antd";
import React from "react";

const ConfirmOrderModal = (props) => {
  const { visible, item, onCancel, onSubmit } = props;
  return (
    <Modal
      title={"Confirm order"}
      open={visible}
      footer={<></>}
      centered
      onCancel={onCancel}
    >
      {JSON.stringify(item)}
    </Modal>
  );
};

export default ConfirmOrderModal;
