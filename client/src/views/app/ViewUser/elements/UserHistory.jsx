import { Avatar, Button, List, Modal, Skeleton, Tag } from "antd";
import React, { useEffect, useState } from "react";
import fetcher from "../../../../utils/helpers/fetcher";
import { REQUEST_PARAMS } from "../../../../utils/constants/urlPath.constant";
import useGlobalStore from "../../../../store/global.zustand";
import formatPrice from "../../../../utils/helpers/formatPrice";
import formatDate from "../../../../utils/helpers/formatDate";
import { getGHNOrder } from "../../../../utils/helpers/ghnFetcher";
import { ORDER_STATUS } from "../../../../utils/constants/status.constant";
import ComponentLoading from "../../../../components/layout/ComponentLoading";
import CModal from "../../../../components/core/CModal";
import CTooltip from "../../../../components/core/CTooltip";

const UserHistory = (props) => {
  // Store
  const { checkToken } = useGlobalStore((state) => state);

  // State
  const [loading, setLoading] = useState(false);
  const [historyList, setHistoryList] = useState([]);
  const [cartDetail, setCartDetail] = useState(null);

  // Functions
  const handleInitHistory = async () => {
    const user = props?.user || checkToken()["0"];
    if (!user || (historyList.length && !props.user)) return;
    setLoading(true);
    const data = await fetcher(REQUEST_PARAMS.GET_CART_HISTORY, {
      creator: user.userName,
    });
    setLoading(false);

    setHistoryList(data);
  };

  const handleShowDetail = async (rec) => {
    setCartDetail(rec);
  };

  useEffect(() => {
    handleInitHistory();
  }, []);

  useEffect(() => {
    if (props?.user) handleInitHistory();
  }, [props?.user]);

  return (
    <>
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={props.historyList || historyList}
        renderItem={(item) => (
          <List.Item
            actions={
              props.actions || [
                <a
                  key="list-loadmore-edit"
                  className="text-blue-700 font-semibold"
                  onClick={() => handleShowDetail(item)}
                >
                  Detail
                </a>,
              ]
            }
            className="w-full"
          >
            <Skeleton avatar title={false} loading={loading} active>
              <List.Item.Meta
                title={
                  <div className="flex gap-4">
                    <p>Total: {formatPrice(item.totalPrice)}</p>
                    {/* <OrderStatus status={item.status} /> */}
                  </div>
                }
                description={`Quantity: ${
                  item?.products?.length
                } | ${formatDate(item.createDate)}`}
              />
            </Skeleton>
          </List.Item>
        )}
      />
      <CartDetail onCancel={() => setCartDetail(null)} item={cartDetail} />
    </>
  );
};

function OrderStatus({ status }) {
  const { text, color } = ORDER_STATUS?.[status] ?? {
    text: "status",
    color: "",
  };

  return (
    <Tag color={color} className="uppercase">
      {text}
    </Tag>
  );
}

function CartDetail({ item, onCancel }) {
  const [loading, setLoading] = useState(false);
  const [shipData, setShipData] = useState(null);

  console.log({ item });
  const handleInitData = async (item) => {
    const findShippingInfo = item?.shippingOrderInfo;
    if (!findShippingInfo) {
      setShipData(null);
      return;
    }

    setLoading(true);
    const shippingData = await getGHNOrder(findShippingInfo?.data?.order_code);
    console.log({ shippingData });
    setShipData(shippingData.data);
    setLoading(false);
  };

  useEffect(() => {
    if (item) handleInitData(item);
  }, [item]);

  return (
    <CModal
      onCancel={onCancel}
      onOk={onCancel}
      open={Boolean(item)}
      title={
        <div>
          {loading ? (
            <ComponentLoading />
          ) : (
            <>
              Order detail - <OrderStatus status={shipData?.status} />
            </>
          )}
        </div>
      }
      centered
    >
      {!loading && (
        <>
          {/* {JSON.stringify(item)} */}
          <div>
            {item?.products?.map((i) => {
              const { info } = i;
              return (
                <div key={info.name} className="flex gap-4 pb-4 border-b-2">
                  <img src={info.image} className="max-w-[20%]" />
                  <div>
                    <p key={info.name} className="font-semibold">
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
          <div className="flex items-start justify-between pb-2 border-b-2 my-2">
            Fullname: <span className="text-right">{item?.user?.name}</span>
          </div>
          <div className="flex items-start justify-between pb-2 border-b-2 my-2">
            Phone: <span className="text-right">{item?.user?.phone}</span>
          </div>
          <div className="flex items-start justify-between pb-2 border-b-2 my-2">
            Address: <span className="text-right">{shipData?.to_address || item?.user?.street}</span>
          </div>
          <div className="flex items-start justify-between pb-2 border-b-2 my-2">
            <section className="w-1/2">Subtotal</section>
            <section className="w-1/2 text-right">-</section>
          </div>
          <div className="flex items-start justify-between pb-2 border-b-2 my-2">
            <section className="w-1/2">Estimated Delivery & Handling</section>
            <section className="w-1/2 text-right">
              {formatPrice(item?.totalPrice || 0)}
            </section>
          </div>
          <div className="flex items-start justify-between pb-2 my-2 font-semibold text-lg">
            <section className="w-1/2 ">Total Fee</section>
            <section className="w-1/2 text-right flex justify-end items-center gap-1">
              {formatPrice((item?.totalPrice || 0) + 30000)}
            </section>
          </div>
        </>
      )}
    </CModal>
  );
}

export { OrderStatus, CartDetail };
export default UserHistory;
