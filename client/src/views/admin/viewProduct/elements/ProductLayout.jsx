import { Modal, notification, Popconfirm } from "antd";
import { createContext, memo, useEffect, useMemo, useState } from "react";
import CButton from "../../../../components/core/CButton";
import CTable from "../../../../components/core/CTable";
import FormBuilder from "../../../../components/core/FormBuilder";
import fetcher from "../../../../utils/helpers/fetcher";
import useFetch from "../../../../utils/hooks/useFetch";
import { REQUEST_PARAMS } from "../../../../utils/constants/urlPath.constant";
import UserHistory from "../../../app/ViewUser/elements/UserHistory";
import formatPrice from "../../../../utils/helpers/formatPrice";
import formatDate from "../../../../utils/helpers/formatDate";
import { useSearchParams } from "react-router-dom";

const Context = createContext({
  name: "Default",
});

const ProductLayout = (props) => {
  const { fetcherHook, data, loading } = useFetch();
  const { viewName, schemas } = props;
  const {
    columns: schemaColumns,
    formSchema: propsFormSchema,
    requets,
  } = schemas;
  const { ADD_TABLE_ITEM, DELETE_TABLE_ITEM, GET_TABLE_ITEMS } = requets;

  let [searchParams] = useSearchParams();
  const urlQuery = useMemo(() => searchParams.get("type"), [searchParams]);

  const [api, contextHolder] = notification.useNotification();

  // Static
  var additionColumns = {
    action: {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: "120px",
      render: (_, record) => (
        <div className="flex gap-2">
          <CButton onClick={() => handleEditCell(record)} size="small">
            Edit
          </CButton>
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
    },
    user: [
      {
        title: "Detail orders",
        dataIndex: "detail",
        key: "detail",
        render: (text, record) => (
          <a
            onClick={() => handleClickUserDetail(record.userName)}
            className="text-blue-400"
          >
            Click
          </a>
        ),
      },
    ],
    orders: [
      {
        title: "Date",
        dataIndex: "createDate",
        key: "createDate",
        render: (text) => <a>{formatDate(text)}</a>,
      },
      {
        title: "Price",
        dataIndex: "totalPrice",
        key: "totalPrice",
        render: (_, record) => <a>{formatPrice(record.totalPrice)}</a>,
      },
      {
        title: "Quantity",
        dataIndex: "products",
        key: "products",
        render: (_, record) => <a>{record.products.length}</a>,
      },
    ],
  };

  const [openForm, setOpenForm] = useState(false);
  const [formType, setFormType] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [updateCell, setUpdateCell] = useState(null);
  const [columns, setColumns] = useState([
    ...schemaColumns,
    ...(additionColumns?.[viewName] ?? []),
    additionColumns.action,
  ]);
  const [formSchema, setFormSchema] = useState(propsFormSchema);
  const [localLoading, setLocalLoading] = useState(false);
  const [userDetail, setUserDetail] = useState();

  const contextValue = useMemo(
    () => ({
      name: "Ant Design",
    }),
    []
  );

  // Functions
  const toggleForm = () => setOpenForm(!openForm);
  function handleCancel() {
    toggleForm();
    setUpdateCell(null);
  }
  async function handleOk(e) {
    const [path, method] = ADD_TABLE_ITEM;
    try {
      if (formType === "new") validateDataBeforeCallAPI(e);
      await fetcher([path, formType === "edit" ? "PUT" : method], e);
      await fetcherHook(GET_TABLE_ITEMS);
      setDataSource(mapData(ADD_TABLE_ITEM[1], e));
      msg();
    } catch (error) {
      console.error(error.message);
      msg(error.message, "error");
    } finally {
      if (formType === "edit") toggleForm()
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

  function handleEditCell(record) {
    setFormType("edit");
    setOpenForm(true);
    setUpdateCell(record);
  }

  function validateDataBeforeCallAPI(e) {
    const isExistName = dataSource.findIndex((i) => i?.name === e?.name);
    if (isExistName <= 0) {
      // Mutate data
      if (
        urlQuery === "categories" &&
        e.groups?.includes("761fcea4-58b4-4ce9-a4a5-fd5239228047")
      ) {
        const saleValue = e.saleValue + (e.saleType === "percent" ? "%" : "");
        e.description = `${saleValue}_${e.description}`;
        delete e.saleType;
        delete e.saleValue;
      }

      return true;
    }

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
    if (arrayData?.length) setDataSource(data);
    else setDataSource([]);
  }

  const handleClickAdd = () => {
    toggleForm();
    setFormType("new");
  };

  function handleInit() {
    fetcherHook(requets.GET_TABLE_ITEMS);
  }

  async function handleClickUserDetail(creator) {
    setLocalLoading(true);
    const data = await fetcher(REQUEST_PARAMS.GET_CART_HISTORY, {
      creator,
    });
    setLocalLoading(false);
    setUserDetail(data);
  }

  const onFormChange = (name, value, formValue) => {
    if (urlQuery === "categories") {
      if (formValue?.groups?.includes("761fcea4-58b4-4ce9-a4a5-fd5239228047")) {
        setFormSchema([
          ...formSchema,
          {
            label: "Sale value",
            type: "Number",
            field: "saleValue",
            rules: { required: true },
            wrapClassName: "h-[70px]",
            className: "flex-col",
          },
          {
            label: "Sale by %",
            type: "Select",
            field: "saleType",
            rules: { required: true },
            wrapClassName: "h-[70px]",
            className: "flex-col",
            options: [
              {
                value: "percent",
                label: "%",
              },
              {
                value: "raw",
                label: "Raw amount",
              },
            ],
          },
        ]);
      } else {
        setFormSchema(propsFormSchema);
      }
    }
  };

  // Effects
  useEffect(() => {
    handleInit();
  }, []);

  useEffect(() => {
    handleAssignListData(data);
  }, [data]);

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <div className="w-full">
        <CButton onClick={handleClickAdd} type="primary" className="mb-2">
          Add+
        </CButton>
        <CTable
          columns={columns}
          dataSource={dataSource}
          loading={loading || localLoading}
        />
        <Modal
          open={openForm}
          title={(updateCell ? "Update " : "Add new ") + viewName}
          onCancel={handleCancel}
          onDelete={handleDeleteItem}
          footer={<></>}
          width={"90%"}
          className="max-w-[1600px]"
        >
          <FormBuilder
            schema={formSchema}
            formValue={updateCell}
            onSubmit={handleOk}
            loading={loading}
            onChange={onFormChange}
          />
        </Modal>

        {/* USER DETAIL ORDERS */}
        <Modal
          open={Boolean(userDetail)}
          title={
            <p className="uppercase">{viewName + " " + "detail orders"}</p>
          }
          onCancel={() => setUserDetail(undefined)}
          footer={<></>}
          width={"90%"}
          className="max-w-[1600px]"
        >
          <UserHistory historyList={userDetail} actions={[]} />
        </Modal>
      </div>
    </Context.Provider>
  );
};

export default memo(ProductLayout);
