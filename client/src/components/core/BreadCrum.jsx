import React, { useMemo } from "react";
import { Breadcrumb } from "antd";
import { useResolvedPath } from "react-router-dom";

const BreadCrum = (props) => {
  const { pathname } = useResolvedPath();

  const items = useMemo(() => {
    return pathname.split("/").map((i) => ({ title: i.toUpperCase() })) ?? [];
  }, [pathname]);

  return <Breadcrumb items={props.items ?? items} />;
};

export default BreadCrum;
