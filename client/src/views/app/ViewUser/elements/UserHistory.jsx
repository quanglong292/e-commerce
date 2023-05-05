import { Avatar, Button, List, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import fetcher from "../../../../utils/helpers/fetcher";
import { REQUEST_PARAMS } from "../../../../utils/constants/urlPath.constant";
import useGlobalStore from "../../../../store/global.zustand";
import formatPrice from "../../../../utils/helpers/formatPrice";

const UserHistory = () => {
  // Store
  const user = useGlobalStore((state) => state.user);

  // State
  const [loading, setLoading] = useState(false);
  const [historyList, setHistoryList] = useState([]);

  // Functions

  const handleInitHistory = async () => {
    if (!user || historyList.length) return;
    setLoading(true);
    const data = await fetcher(REQUEST_PARAMS.GET_CART_HISTORY, {
      creator: user.username,
    });
    setLoading(false);

    setHistoryList(data);
  };

  useEffect(() => {
    handleInitHistory();
  }, [user]);

  return (
    <>
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={historyList}
        renderItem={(item) => (
          <List.Item
            actions={[
              <a
                key="list-loadmore-edit"
                className="text-blue-400 font-semibold"
              >
                Detail
              </a>,
            ]}
            className="w-full"
          >
            <Skeleton avatar title={false} loading={loading} active>
              <List.Item.Meta
                title={<p>Total: {formatPrice(item.totalPrice)}</p>}
                description="Quantity: 2 | 10/10/2000"
              />
            </Skeleton>
          </List.Item>
        )}
      />
      <Button onClick={handleInitHistory}>asd</Button>
    </>
  );
};

export default UserHistory;
