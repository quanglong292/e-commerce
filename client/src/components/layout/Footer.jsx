import React from "react";
import useProductStore from "../../store/product.zustand";
import {
  FacebookFilled,
  InstagramOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";

const ABOUT = ["About us", "Careers", "Order status", "Contact"];

const Footer = () => {
  const categoryGroups = useProductStore((state) => state.categoryGroups);

  return (
    <div className="mt-12 w-full bg-black text-white p-4 lg:px-24">
      <div className="lg:flex">
        <div className="lg:w-[60%] flex justify-between">
          <div className="">
            <p className="text-xl font-bold uppercase">Categories</p>
            {categoryGroups?.map((i) => {
              return (
                <div
                  key={i.name}
                  className="w-fit uppercase cursor-pointer hover:text-slate-300"
                >
                  {i.name}
                </div>
              );
            })}
          </div>
          <div className="">
            <p className="text-xl font-bold uppercase">Help Me</p>
            {ABOUT.map((i) => {
              return (
                <div
                  key={i}
                  className="w-fit text-sm capitalize cursor-pointer text-gray-300 hover:text-slate-300"
                >
                  {i}
                </div>
              );
            })}
          </div>
          <div className=""></div>
        </div>
        <div className="lg:w-[40%] text-2xl flex gap-4 justify-center items-start my-4 lg:m-0">
          <FacebookFilled />
          <TwitterOutlined />
          <YoutubeOutlined />
          <InstagramOutlined /> 
        </div>
      </div>
      <div className="flex gap-8 text-xs mt-8">
        <span>Viet Nam</span>
        <span className="text-gray-300">
          © 2023 Nike, Inc. All Rights Reserved
        </span>
      </div>
    </div>
  );
};

export default Footer;
