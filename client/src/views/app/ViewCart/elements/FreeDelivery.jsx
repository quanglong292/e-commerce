import React, { memo } from "react";

const FreeDelivery = memo(() => {
  return (
    <div className="p-4 bg-gray-100 mb-4">
      <p className="uppercase">Free delivery</p>
      <p className="text-sm">
        Applies to orders of ₫5.000.000 or more.{" "}
        <span className="underline">View details</span>
      </p>
    </div>
  );
});

export default FreeDelivery;
