import { DownOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Dropdown, Input, Space } from "antd";
import React from "react";
import useProductStore from "../../../../store/product.zustand";
import { FILTER_OPTIONS } from "../../../../utils/constants/navigation.constant";

const { Search } = Input;

const items = [
  {
    label: <p>Price: High-Low</p>,
    key: "2",
    value: "highToLow",
  },
  {
    label: <p>Price: Low-High</p>,
    key: "3",
    value: "lowToHigh",
  },
];

const FilterBarController = ({ clickShowFilter }) => {
  const setFilter = useProductStore((state) => state.setFilter);

  function onSearch(e) {
    setFilter(FILTER_OPTIONS.search, e);
  }

  function onSortClick({ key }) {
    const value = items.find((i) => i.key === key)?.value;
    setFilter(FILTER_OPTIONS.sortBy, value);
  }

  return (
    <div className="w-full flex justify-end mb-2 gap-4 items-center">
      <div className="w-[240px]">
        <Search placeholder="Search" onSearch={onSearch} className="w-full" />
      </div>
      <div
        onClick={clickShowFilter}
        className="flex items-center gap-1 mr-4 text-sm cursor-pointer hover:text-blue-500"
      >
        Show Filter <MenuFoldOutlined />
      </div>
      <Dropdown trigger={["click"]} menu={{ items, onClick: onSortClick }}>
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
