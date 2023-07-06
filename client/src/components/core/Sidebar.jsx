import { memo, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Menu } from "antd";
import { SIDE_BAR_ITEMS } from "../../utils/constants/navigation.constant";

const Sidebar = memo(() => {
  const navigate = useNavigate();
  let location = useLocation();
  const path = useMemo(() => location.pathname.split("/")[1], [location]);

  return (
    <Menu
      defaultSelectedKeys={[path]}
      defaultOpenKeys={[path]}
      mode="inline"
      theme="dark"
      items={SIDE_BAR_ITEMS}
      onClick={(e) => navigate(e.key)}
      style={{
        width: "16%",
        minWidth: "fit-content",
        minHeight: "100%",
      }}
    />
  );
});

export default Sidebar;
