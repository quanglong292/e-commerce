import { Modal, notification, Popconfirm } from "antd";
import { createContext, memo, useEffect, useMemo, useState } from "react";
import CButton from "../../../../components/core/CButton";
import CTable from "../../../../components/core/CTable";
import FormBuilder from "../../../../components/core/FormBuilder";
import fetcher from "../../../../utils/functions/fetcher";
import useFetch from "../../../../utils/functions/useFetch";

const Context = createContext({
  name: "Default",
});

const ProductLayout = (props) => {
  const { fetcherHook, data, loading } = useFetch();
  const { viewName, schemas } = props;
  const { columns, formSchema, requets } = schemas;
  const { ADD_TABLE_ITEM, DELETE_TABLE_ITEM, GET_TABLE_ITEMS } = requets;

  const [api, contextHolder] = notification.useNotification();

  const [openForm, setOpenForm] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  const actionColumn = {
    title: "Action",
    dataIndex: "action",
    key: "action",
    width: "120px",
    render: (_, record) => (
      <div className="flex gap-2">
        <CButton size="small">Edit</CButton>
        <Popconfirm
          title="Delete item"
          description="Are you sure to delete this item?"
          onConfirm={() => handleDeleteItem(record.id)}
          //   onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <CButton type="primary" size="small" danger>
            Delete
          </CButton>
        </Popconfirm>
      </div>
    ),
  };

  const contextValue = useMemo(
    () => ({
      name: "Ant Design",
    }),
    []
  );

  const toggleForm = () => setOpenForm(!openForm);
  function handleCancel() {
    toggleForm();
  }
  async function handleOk(e) {
    try {
      validateDataBeforeCallAPI(e);
      await fetcher(ADD_TABLE_ITEM, e);
      await fetcherHook(GET_TABLE_ITEMS);
      // setDataSource(mapData(ADD_TABLE_ITEM[1], e));
      msg();
    } catch (error) {
      console.error(error.message);
      msg(error.message, "error");
    } finally {
      // toggleForm();
    }
  }

  async function handleDeleteItem(id) {
    try {
      await fetcher(DELETE_TABLE_ITEM, { id });
      setDataSource(mapData(DELETE_TABLE_ITEM[1], id));
      msg();
    } catch (error) {
      console.error(error.message);
      msg(error.message, "error");
    } finally {
      // toggleForm();
    }
  }

  function validateDataBeforeCallAPI(e) {
    const isExistName = dataSource.findIndex((i) => i?.name === e?.name);

    if (isExistName < 0) return true;

    throw {
      message: "Data name is exist!",
    };
  }

  function mapData(type, val) {
    let newData = dataSource;

    if (type === "DELETE") newData = newData.filter((i) => i.id !== val);
    if (type === "POST") newData = [...newData, val];

    return newData;
  }

  function msg(description = "Success", type = "success") {
    api[type]({
      description,
      placement: "bottomLeft",
      duration: 1.2,
    });
  }

  function handleAssignListData(arrayData) {
    if (typeof arrayData !== "array") setDataSource([]);
    if (arrayData?.length) setDataSource(data);
  }

  useEffect(() => {
    fetcherHook(requets.GET_TABLE_ITEMS);
  }, []);

  useEffect(() => {
    handleAssignListData(data);
  }, [data]);

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <div className="w-full">
        <CButton onClick={() => toggleForm()} type="primary" className="mb-2">
          Add+
        </CButton>
        <CTable
          columns={[...columns, actionColumn]}
          dataSource={dataSource}
          loading={loading}
        />
        <Modal
          open={openForm}
          title={"Add new " + viewName}
          onCancel={handleCancel}
          onDelete={handleDeleteItem}
          footer={<></>}
          width="80%"
          className="max-w-[80%]"
        >
          <FormBuilder
            schema={formSchema}
            onSubmit={handleOk}
            loading={loading}
          />
        </Modal>
      </div>
    </Context.Provider>
  );
};

export default memo(ProductLayout);
