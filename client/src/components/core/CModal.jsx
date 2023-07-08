import { Modal } from "antd";
import React, { memo } from "react";
import CButton from "./CButton";

const CModal = memo(({ children, ...rest }) => {
  return (
    <Modal
      {...rest}
      title={<p className="text-lg">{rest?.title}</p>}
      footer={
        rest.footer ? (
          rest.footer
        ) : (
          <div className="flex">
            <CButton onClick={rest?.onOk} type="black">
              OK
            </CButton>
          </div>
        )
      }
    >
      {children}
    </Modal>
  );
});

export default CModal;
