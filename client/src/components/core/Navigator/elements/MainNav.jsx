import React, { useEffect } from "react";
import Logo from "../../../../assets/icons/Logo";
import { NavLink, useNavigate, useResolvedPath } from "react-router-dom";
import MobileNav from "./MobileNav";
import { Button, Input, Tooltip } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import CButton from "../../CButton";
import useGlobalStore from "../../../../store/global.zustand";
import ComponentLoading from "../../../layout/ComponentLoading";

const MainNav = ({ schema }) => {
  const navigate = useNavigate();
  const { pathname } = useResolvedPath();
  const { handleLogout, token, setting } = useGlobalStore((state) => state);

  // Functions
  const handleClickLogo = () => {
    if (pathname.includes("app")) navigate("app");
    else navigate("/");
  };

  const handleFocusSearch = () => {
    navigate("/app/search");
  };

  const handleAdminLogout = () => {
    handleLogout();
    navigate("/auth/admin");
  };

  return (
    <div className="w-full h-[56px] shadow-md bg-white mb-2 px-4 py-2 flex justify-between items-center">
      <div className="cursor-pointer w-fit" onClick={handleClickLogo}>
        {setting ? <img src={setting.logo} alt="logo" className="w-[40px] h-[40px]" /> : "Admin Portal"}
      </div>
      <div className="w-[50%] flex justify-end gap-6">
        <div className="min-w-fit hidden lg:flex gap-4 items-center font-roboto uppercase font-semibold">
          {schema.map((i) => (
            <NavLink
              key={i.key}
              to={`${i.path}`}
              className={({ isActive, isPending }) =>
                isActive
                  ? "text-blue-400 cursor-pointer text-sm ease-out duration-300 border-b-2 border-blue-400"
                  : isPending
                  ? "hover:text-blue-400 cursor-pointer text-sm ease-out duration-300"
                  : "hover:text-blue-400 cursor-pointer text-sm ease-out duration-300"
              }
            >
              {i?.shortLabel || i.label}
            </NavLink>
          ))}
        </div>
        {pathname.includes("app") ? (
          <Tooltip title="search">
            <Button
              onClick={handleFocusSearch}
              shape="circle"
              icon={<SearchOutlined />}
            />
          </Tooltip>
        ) : (
          <>{token && <Button onClick={handleAdminLogout}>Logout</Button>}</>
        )}
      </div>

      {/* MOBILE */}
      <MobileNav schema={schema} />
    </div>
  );
};

export default MainNav;
