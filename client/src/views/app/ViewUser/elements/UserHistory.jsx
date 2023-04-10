import { Avatar, List, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import CButton from "../../../../components/core/CButton";

const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

const UserHistory = () => {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);

  const onLoadMore = () => {
    setLoading(true);
    setList(
      data.concat(
        [...new Array(count)].map(() => ({
          loading: true,
          name: {},
          picture: {},
        }))
      )
    );
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        const newData = data.concat(res.results);
        setData(newData);
        setList(newData);
        setLoading(false);
        // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
        // In real scene, you can using public method of react-virtualized:
        // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
        window.dispatchEvent(new Event("resize"));
      });
  };

  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          height: 32,
          lineHeight: "32px",
        }}
      >
        <CButton onClick={onLoadMore}>Loading more</CButton>
      </div>
    ) : null;

  useEffect(() => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        setInitLoading(false);
        setData(res.results);
        setList(res.results);
      });
  }, []);

  return (
    <List
      className="demo-loadmore-list"
      loading={initLoading}
      itemLayout="horizontal"
      loadMore={loadMore}
      dataSource={list}
      renderItem={(item) => (
        <List.Item
          actions={[
            <a key="list-loadmore-edit" className="text-blue-400 font-semibold">
              Detail
            </a>,
          ]}
          className="w-full"
        >
          <Skeleton avatar title={false} loading={item.loading} active>
            <List.Item.Meta
              avatar={
                <Avatar
                  shape="square"
                  src="https://image.goat.com/750/attachments/product_template_pictures/images/011/119/994/original/218099_00.png.png"
                  size={60}
                />
              }
              title={<a href="https://ant.design">{item.name?.last}</a>}
              description="Size 10.5 | Price: $100 | Quantity: 2 | 10/10/2000"
            />
          </Skeleton>
        </List.Item>
      )}
    />
  );
};

export default UserHistory;
