import React from "react";

const ProductSection = () => {
  return (
    <div className="bg-gray-100 p-2 flex">
      <div className="w-[70%] mx-auto">
        <img
          src="https://images.footlocker.com/is/image/EBFL2/HR0500_a1?wid=520&hei=520&fmt=png-alpha"
          alt=""
          className="mx-auto max-w-full"
        />
        <div className="cursor-pointer w-fit m-auto">Zoom +</div>
        <div className="w-[90%] mx-auto">Slider</div>
      </div>
      <div className="w-[30%] bg-white p-4">
        <div className="text-xl">Reebok Shaq Attaq</div>
      </div>
    </div>
  );
};

export default ProductSection;
