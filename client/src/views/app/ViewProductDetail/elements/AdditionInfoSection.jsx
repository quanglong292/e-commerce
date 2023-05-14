import { Tabs } from "antd";
import React from "react";

const PRODUCT_DETAIL_ADDITION_SECTION_TABS = [
  {
    label: "Detail",
    key: "detail",
    children: <DetailTab />,
  },
  {
    label: "Review",
    key: "review",
    children: <ReviewTab />,
  },
];

function DetailTab() {
  return (
    <div>
      Product #: HR0500 Dominate the paint and shatter backboards like Dr. Shaq
      in the Reebok Shaq Attaq. Hitting the scene in 1992, these silhouettes are
      celebrating 30 years of Shaq’s feats on the court and symbolize the
      journey of how a man carved his way into a legend of the sport. Paying a
      nod to Diesel’s undeniable power and explosiveness, the Reebok Shaq Attaq
      lets you walk in his footsteps of excellence and dominate the court like a
      beast.
    </div>
  );
}

function ReviewTab() {
  return <div>ReviewTab</div>;
}

const AdditionInfoSection = () => {
  return (
    <div className="">
      <Tabs
        // onChange={onChange}
        type="card"
        items={PRODUCT_DETAIL_ADDITION_SECTION_TABS}
      />
    </div>
  );
};

export default AdditionInfoSection;
