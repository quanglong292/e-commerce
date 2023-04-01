import { Outlet } from "react-router-dom";
import Navigation from "../core/Navigation";
// import Sidebar from "../core/Sidebar";

const RootViewLayout = () => {
  return (
    <div className="w-full">
      <Navigation />
      <div id="sidebar" className="flex items-start w-full">
        {/* <div className="h-full w-[20%] min-w-[200px] max-w-[20%]">
          <Sidebar />
        </div> */}
        <div
          id="detail"
          className="overflow-y-auto overflow-x-hidden bg-slate-100 w-full p-2"
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default RootViewLayout;
