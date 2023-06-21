import { Avatar, Button, List, Skeleton, Tag } from "antd";
import React, { useEffect, useState } from "react";
import fetcher from "../../../../utils/helpers/fetcher";
import { REQUEST_PARAMS } from "../../../../utils/constants/urlPath.constant";
import useGlobalStore from "../../../../store/global.zustand";
import formatPrice from "../../../../utils/helpers/formatPrice";
import formatDate from "../../../../utils/helpers/formatDate";

const UserHistory = (props) => {
  // Store
  const { checkToken } = useGlobalStore((state) => state);

  // State
  const [loading, setLoading] = useState(false);
  const [historyList, setHistoryList] = useState([]);

  // Functions

  const handleInitHistory = async () => {
    const user = checkToken()["0"];
    if (!user || historyList.length || props.historyList?.length) return;

    setLoading(true);
    const data = await fetcher(REQUEST_PARAMS.GET_CART_HISTORY, {
      creator: user.userName,
    });
    setLoading(false);

    setHistoryList(data);
  };

  useEffect(() => {
    handleInitHistory();
  }, []);

  return (
    <>
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={props.historyList || historyList}
        renderItem={(item) => (
          <List.Item
            // actions={
            //   props.actions || [
            //     <a
            //       key="list-loadmore-edit"
            //       className="text-blue-400 font-semibold"
            //     >
            //       Detail
            //     </a>,
            //   ]
            // }
            className="w-full"
          >
            <Skeleton avatar title={false} loading={loading} active>
              <List.Item.Meta
                title={
                  <div className="flex gap-4">
                    <p>Total: {formatPrice(item.totalPrice)}</p>
                    <OrderStatus status={item.status} />
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
    </>
  );
};

export default UserHistory;

export function OrderStatus({ status }) {
  const color =
    status === "order shipped"
      ? "green"
      : status === "cancel"
      ? "red"
      : "orange";
  return (
    <Tag color={color} className="uppercase">
      {status}
    </Tag>
  );
}
