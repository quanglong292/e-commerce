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
    console.log({ user, historyList });
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

  const handleInitData = async (item) => {
    const findShippingInfo = item?.shippingOrderInfo;
    if (!findShippingInfo) return;

    setLoading(true);
    const shippingData = await getGHNOrder(findShippingInfo?.data?.order_code);
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
        </>
      )}
    </CModal>
  );
}

export { OrderStatus, CartDetail };
export default UserHistory;
