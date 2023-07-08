import { notification, Popconfirm } from "antd";
import { createContext, memo, useEffect, useMemo, useState } from "react";
import CButton from "../../../../components/core/CButton";
import CTable from "../../../../components/core/CTable";
import FormBuilder from "../../../../components/core/FormBuilder";
import fetcher from "../../../../utils/helpers/fetcher";
import useFetch from "../../../../utils/hooks/useFetch";
import { REQUEST_PARAMS } from "../../../../utils/constants/urlPath.constant";
import { CartDetail } from "../../../app/ViewUser/elements/UserHistory";
import formatPrice from "../../../../utils/helpers/formatPrice";
import formatDate from "../../../../utils/helpers/formatDate";
import { useSearchParams } from "react-router-dom";
import ConfirmOrderModal from "./ConfirmOrderModal";
import { createOrder as createGHNOrder } from "../../../../utils/helpers/ghnFetcher";
import handleClientError from "../../../../utils/helpers/handleClientError";
import CSortTable from "../../../../components/core/CSortTable";
import { UNAVAILABLE_ORDER_STATUS } from "../../../../utils/constants/status.constant";
import UserDetail from "./UserDetail";
import CModal from "../../../../components/core/CModal";

const Context = createContext({
  name: "Default",
});

const ProductLayout = (props) => {
  const { fetcherHook, data, loading } = useFetch();
  const { viewName, sortTable = false, schemas } = props;
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
  const additionColumns = {
    action: {
      default: {
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
      orders: {},
    },
    user: [
      {
        title: "User detail",
        dataIndex: "detail",
        key: "detail",
        render: (text, record) => (
          <a
            onClick={() => handleClickUserDetail(record.userName)}
            className="text-blue-400"
          >
            Click to show
          </a>
        ),
      },
    ],
    orders: [
      {
        title: "Details",
        dataIndex: "detail",
        key: "detail",
        render: (_, rec) => {
          return (
            <a onClick={() => setOrderDetail(rec)} className="text-blue-500">
              Click to show
            </a>
          );
        },
      },
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
        render: (_, record) => <a>{record.products?.length}</a>,
      },
      {
        title: "",
        dataIndex: "confirm",
        key: "confirm",
        render: (_, rec) => {
          if (UNAVAILABLE_ORDER_STATUS.includes(rec.status)) return <></>;
          return (
            <div className="flex gap-2">
              <CButton
                type="primary"
                onClick={() => handleConfirmOrder(rec)}
                size="small"
              >
                Confirm
              </CButton>
              <Popconfirm
                title="Delete item"
                description="Are you sure to delete this item?"
                onConfirm={() => handleDeleteItem(rec.id)}
                okText="Yes"
                cancelText="No"
              >
                <CButton type="primary" size="small" danger>
                  Delete
                </CButton>
              </Popconfirm>
            </div>
          );
        },
      },
    ],
    group: [
      {
        key: "sort",
      },
    ],
  };

  // State
  const [openForm, setOpenForm] = useState(false);
  const [formType, setFormType] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [updateCell, setUpdateCell] = useState(null);
  const columns = [
    ...schemaColumns,
    ...(additionColumns?.[viewName] ?? []),
    additionColumns.action[viewName] ?? additionColumns.action.default,
  ];
  const [formSchema, setFormSchema] = useState(propsFormSchema);
  const [localLoading, setLocalLoading] = useState(false);
  const [userDetail, setUserDetail] = useState();
  const [orderToConfirm, setOrderToConfirm] = useState();
  const [orderDetail, setOrderDetail] = useState(null);

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
    console.log("vo day");
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
      if (formType === "edit") toggleForm();
    }
  }

  async function handleDeleteItem(id) {
    // console.log({ handleDeleteItem: id});
    try {
      await fetcher(DELETE_TABLE_ITEM, { id });
      // console.log({ dataSource });
      // setDataSource(mapData(DELETE_TABLE_ITEM[1], id));
      await handleInit();
      msg();
    } catch (error) {
      console.error(error.message);
      handleClientError(error);
    } finally {
      // toggleForm();
    }
  }

  function handleEditCell(record) {
    console.log({ handleEditCell: record });
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
    console.log({ newData });

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
    if (arrayData?.length) {
      setDataSource(arrayData.sort((a, b) => Number(a.key) - Number(b.key)));
    } else setDataSource([]);
  }

  const handleClickAdd = () => {
    toggleForm();
    setFormType("new");
  };

  async function handleInit() {
    await fetcherHook(requets.GET_TABLE_ITEMS);
  }

  async function handleClickUserDetail(creator) {
    console.log({ creator, dataSource });
    // setLocalLoading(true);
    const user = dataSource.find((i) => i.userName === creator);
    // const data = await fetcher(REQUEST_PARAMS.GET_CART_HISTORY, {
    //   creator,
    // });
    // console.log({ data });
    // setLocalLoading(false);
    setUserDetail(user);
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

  async function handleConfirmOrder(rec, type = "open") {
    const { user, products } = orderToConfirm;

    // return
    try {
      if (UNAVAILABLE_ORDER_STATUS.includes(type)) {
        // console.log({ orderToConfirm });
        if (type === "shipping") {
          const { user, products } = orderToConfirm;
          const shipData = await createGHNOrder({
            client_order_code: orderToConfirm.id ?? "test",
            to_name: user?.name ?? "test",
            // to_phone: user?.phone ?? "0909999999",
            // to_address: user?.address?.street ?? "test",
            // to_ward_name: user?.address?.ward ?? "test",
            // to_district_name: user?.address?.district ?? "test",
            // to_province_name: user?.address?.city ?? "test",
            items: products.map((i) => {
              const { info } = i ?? {};
              return {
                name: info?.name ?? "test",
                code: i.id,
                quantity: i.amount,
                price: i.amount * Number(i.value),
                length: 12,
                width: 12,
                height: 12,
                category: {
                  level1: "Sneaker",
                },
              };
            }),
          });
          await fetcher(REQUEST_PARAMS.CONFIRM_CART, {
            id: orderToConfirm.id,
            status: type,
            shippingOrderInfo: shipData,
          });
          notification.success({
            message: "Success!",
          });
        } else {
          await fetcher(REQUEST_PARAMS.CONFIRM_CART, {
            id: orderToConfirm.id,
            status: type,
          });
          notification.success({
            message: "Success!",
          });
        }
        handleInit();
        setOrderToConfirm(null);
      } else setOrderToConfirm(rec);
    } catch (error) {
      console.error(error);
      handleClientError(error);
    }
  }

  const onFinishDrag = (callback, record) => {
    if (typeof callback !== "function") {
      if (!record) throw "Missing record on onFinishDrag";
      const actionType = callback;
      if (actionType === "edit") handleEditCell(record);
      else handleDeleteItem(record.id);
    } else setDataSource(setDataCB);
  };

  const handleBulkSaveChanges = async () => {
    const newDataSource = dataSource.map((item, i) => ({
      ...item,
      key: i + 1 + "",
    }));
    try {
      const newData = await fetcher(
        REQUEST_PARAMS.BULK_CATEGORY_GROUP_UPDATE,
        newDataSource
      );

      handleAssignListData(newData);
    } catch (error) {
      handleClientError(error);
    }
  };

  // Effects
  useEffect(() => {
    handleInit();
  }, [viewName]);

  useEffect(() => {
    handleAssignListData(data);
  }, [data]);

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <div className="w-full">
        <div className="flex justify-between">
          {urlQuery !== "orders" && (
            <>
              <CButton
                onClick={handleClickAdd}
                type="primary"
                className={"mb-2"}
              >
                Add+
              </CButton>
              {urlQuery === "group" && (
                <CButton onClick={handleBulkSaveChanges}>Save All</CButton>
              )}
            </>
          )}
          {/* <FilterBarController /> */}
        </div>
        {sortTable ? (
          <CSortTable
            columns={columns}
            dataSource={dataSource}
            loading={loading || localLoading}
            onFinishDrag={onFinishDrag}
            rowKey="key"
          />
        ) : (
          <CTable
            columns={columns}
            dataSource={dataSource}
            loading={loading || localLoading}
            rowKey="key"
          />
        )}
        <CModal
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
        </CModal>

        {/* USER DETAIL ORDERS */}
        <CModal
          open={Boolean(userDetail)}
          title={
            <p className="uppercase">{viewName + " " + "detail orders"}</p>
          }
          onCancel={() => setUserDetail(undefined)}
          footer={<></>}
          width={"90%"}
          className="max-w-[1600px]"
        >
          <UserDetail user={userDetail} address={userDetail?.address ?? []} />
        </CModal>

        <ConfirmOrderModal
          item={orderToConfirm}
          visible={Boolean(orderToConfirm)}
          onConfirmOrder={handleConfirmOrder}
          onCancel={() => setOrderToConfirm(null)}
        />

        <CartDetail item={orderDetail} onCancel={() => setOrderDetail(null)} />
      </div>
    </Context.Provider>
  );
};

export default memo(ProductLayout);
