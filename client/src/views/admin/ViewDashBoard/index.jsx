import React from "react";
import ScatterChart from "../../../components/layout/ScatterChart";
import { Card } from "antd";
import AreaChart from "../../../components/layout/AreaChart";
import useGlobalStore from "../../../store/global.zustand";
import CAvatar from "../../../components/core/CAvatar";

const ViewDashBoard = () => {
  const { user = {} } = useGlobalStore((state) => state);
  const { info } = user ?? { info: {} };

  return (
    <div>
      {/* <CSortTable2 /> */}
      <section className="mb-4 shadow-lg">
        <Card title="Sales report" style={{ width: "100%" }}>
          <section className="w-full grid grid-cols-3 gap-4">
            <AreaChart rgb="rgba(121,15,91,0.5)" chartTitle="Profit" />
            <AreaChart rgb="rgba(149,246,62,0.4)" chartTitle="Cost" />
            <AreaChart rgb="rgba(227,33,100,1.0)" chartTitle="Total Profit" />
          </section>
        </Card>
      </section>
      <section className="grid grid-cols-5 gap-4">
        <Card
          className="shadow-lg col-span-2"
          title="Your portfolio"
          style={{ width: "100%" }}
        >
          <div className="flex items-center gap-4">
            <CAvatar size={64} />
            <div className="text-lg">
              <p className="text-gray-500 font-semibold">{info?.name}</p>
              <p>{info?.mail}</p>
              <p>{user?.userName}</p>
            </div>
          </div>
        </Card>
        <Card
          className="shadow-lg col-span-3"
          title="Client action tracker"
          style={{ width: "100%" }}
        >
          <ScatterChart />
        </Card>
      </section>
    </div>
  );
};

export default ViewDashBoard;
