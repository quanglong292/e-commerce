import React, { useEffect, useState } from "react";
import CTable from "../../../components/core/CTable";
import CButton from "../../../components/core/CButton";
import AddSaleModal from "./elements/AddSaleModal";
import { REQUEST_PARAMS } from "../../../utils/constants/urlPath.constant";
import fetcher from "../../../utils/helpers/fetcher";
import { Button, Popconfirm, notification } from "antd";
import formatDate from "../../../utils/helpers/formatDate";
import dayjs from "dayjs";

const ViewSupplier = () => {
  // State
  const [visible, setVisible] = useState(false);
  const [list, setList] = useState([]);
  const [edittingCell, setEdittingCell] = useState(null);

  // Functions
  const toggleForm = () => setVisible(!visible);
  const handleInit = async () => {
    const listRes = await fetcher(REQUEST_PARAMS.GET_SALE);
    setList(
      listRes.map((i) => ({
        ...i,
        startDate: formatDate(i.startDate),
        endDate: formatDate(i.endDate),
      }))
    );
  };
  const handleCreateSale = async (submitValue) => {
    await fetcher(REQUEST_PARAMS.ADD_SALE, submitValue);
    notification.success({
      message: edittingCell ? "Updated!" : "Created sale category!",
      placement: "bottomLeft",
    });
    await handleInit();
  };

  const confirmDelete = async (id) => {
    await fetcher(REQUEST_PARAMS.DELETE_SALE, { id });
    notification.warning({
      message: "Deleted sale category!",
      placement: "bottomLeft",
    });
    await handleInit();
  };

  const onEdit = (id) => {
    const item = list.find((i) => i.id === id);
    const formatDate = (date) => dayjs(date, "MM/DD/YYYY").format("YYYY-MM-DD");

    setEdittingCell({
      ...item,
      startDate: formatDate(item.startDate),
      endDate: formatDate(item.endDate),
    });
    toggleForm();
  };

  useEffect(() => {
    handleInit();
  }, []);

  return (
    <div>
      <CButton onClick={toggleForm} type="primary" className="mb-4">
        Add+
      </CButton>
      <CTable
        dataSource={list}
        columns={[
          {
            title: "Title",
            dataIndex: "title",
            key: "title",
          },
          {
            title: "Sale Amount",
            dataIndex: "value",
            key: "value",
            render: (text) => (
              <p>
                {text}
                <span className="text-xs">%</span>
              </p>
            ),
          },
          {
            title: "Start",
            dataIndex: "startDate",
            key: "startDate",
          },
          {
            title: "End",
            dataIndex: "endDate",
            key: "endDate",
          },
          {
            title: "Action",
            dataIndex: "act",
            key: "act",
            render: (_, rec) => (
              <div className="flex gap-2">
                <Button size="small" onClick={() => onEdit(rec.id)}>
                  Edit
                </Button>
                <Popconfirm
                  title="Delete the task"
                  description="Are you sure to delete this task?"
                  onConfirm={() => confirmDelete(rec.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="primary" danger size="small">
                    Delete
                  </Button>
                </Popconfirm>
              </div>
            ),
          },
        ]}
      />
      <AddSaleModal
        visible={visible}
        onCancel={() => {
          toggleForm();
          setEdittingCell(null);
        }}
        onSubmit={handleCreateSale}
        edittingCell={edittingCell}
      />
    </div>
  );
};

export default ViewSupplier;
