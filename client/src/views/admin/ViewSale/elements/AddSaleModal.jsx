import { Button, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import FormBuilder from "../../../../components/core/FormBuilder";
import CButton from "../../../../components/core/CButton";
import CTable from "../../../../components/core/CTable";
import useProductStore from "../../../../store/product.zustand";
import { formatToSystemDate } from "../../../../utils/helpers/formatDate";
import handleClientError from "../../../../utils/helpers/handleClientError";

const AddSaleModal = (props) => {
  const { visible, onCancel, onSubmit } = props;
  const { allProducts, fetch } = useProductStore((state) => state);

  // State
  const [selecteds, setSelecteds] = useState([]);

  // Function
  const handleSelect = (e) => {
    setSelecteds(
      e
        .map((i) => allProducts.find((j) => j.id === i))
        .map((i) => {
          return {
            ...i,
            totalStock: i?.stocks?.reduce((a, b) => a + Number(b.value), 0),
          };
        })
    );
  };

  const handleCreateSale = (formValue) => {
    if (!selecteds.length)
      return handleClientError({ message: "Please select product!" });

    const submitValue = {
      ...formValue,
      startDate: formatToSystemDate(formValue.startDate),
      endDate: formatToSystemDate(formValue.endDate),
      products: selecteds.map((i) => i.id),
    };
    onSubmit(submitValue);
  };

  useEffect(() => {
    if (!allProducts.length) {
      fetch();
    }
  }, []);

  return (
    <Modal
      title={"Sale products"}
      open={visible}
      footer={<></>}
      centered
      onCancel={onCancel}
      width={"90%"}
      className="max-w-[1600px]"
    >
      <div className="flex gap-4">
        <div className="w-1/2">
          <FormBuilder
            schema={[
              "grid grid-cols-2 gap-4",
              {
                label: "Title",
                type: "Text",
                field: "title",
                rules: { required: true },
                wrapClassName: "h-[70px]",
                className: "flex-col",
              },
              {
                label: "Sale amount",
                type: "Number",
                field: "value",
                rules: { required: true },
                wrapClassName: "h-[70px]",
                className: "flex-col",
                max: 100,
              },
              {
                label: "Start date",
                type: "Date",
                field: "startDate",
                rules: { required: true },
                wrapClassName: "h-[70px]",
                className: "flex-col",
              },
              {
                label: "End date",
                type: "Date",
                field: "endDate",
                rules: { required: true },
                wrapClassName: "h-[70px]",
                className: "flex-col",
              },
              {
                label: "Description",
                type: "TextArea",
                field: "description",
                rules: { required: false },
                wrapClassName: "h-[70px]",
                className: "flex-col",
              },
            ]}
            onSubmit={handleCreateSale}
          />
        </div>
        <div className="w-1/2">
          <p className="font-semibold text-lg mb-4">Select products</p>
          <div className="flex gap-2">
            <Select
              className="w-full mb-2"
              options={allProducts.map((i) => ({
                ...i,
                value: i.id,
                label: i.name,
              }))}
              onChange={handleSelect}
              mode="multiple"
              maxTagCount="responsive"
              allowClear
              value={selecteds.map((i) => i.id)}
            />
            <CButton type="primary">Add+</CButton>
          </div>
          <CTable
            dataSource={selecteds}
            columns={[
              {
                title: "Name",
                dataIndex: "name",
                key: "name",
              },
              {
                title: "Total stock",
                dataIndex: "totalStock",
                key: "totalStock",
              },
              {
                title: "Action",
                dataIndex: "act",
                key: "act",
                render: (_, rec) => (
                  <Button
                    onClick={() =>
                      setSelecteds(selecteds.filter((i) => i.id !== rec.id))
                    }
                    type="primary"
                    danger
                    size="small"
                  >
                    Delete
                  </Button>
                ),
              },
            ]}
          />
        </div>
      </div>
    </Modal>
  );
};

export default AddSaleModal;
