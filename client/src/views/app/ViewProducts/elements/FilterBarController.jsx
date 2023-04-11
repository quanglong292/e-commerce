import { DownOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import Search from "antd/es/transfer/search";
import React from "react";

const items = [
  {
    label: <p>Featured</p>,
    key: "0",
  },
  {
    label: <p>Newest</p>,
    key: "1",
  },
  {
    label: <p>Price: High-Low</p>,
    key: "2",
  },
  {
    label: <p>Price: Low-High</p>,
    key: "3",
  },
];

const FilterBarController = (props) => {
  const { clickShowFilter } = props;

  function onSearch(e) {
    console.log("onSearch", e);
  }

  return (
    <div className="w-full flex justify-end mb-2 gap-4 items-center">
      <div className="w-[240px]">
        <Search
          placeholder="Search"
          onSearch={onSearch}
          className="w-full"
          // style={{ width: 1000 }}
        />
      </div>
      <div
        onClick={clickShowFilter}
        className="flex items-center gap-1 mr-4 text-sm cursor-pointer hover:text-blue-500"
      >
        Show Filter <MenuFoldOutlined />
      </div>
      <Dropdown trigger={["click"]} menu={{ items }}>
        <a
          className="hover:text-blue-500 cursor-pointer"
          onClick={(e) => e.preventDefault()}
        >
          <Space>
            Sort by
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
};

export default FilterBarController;