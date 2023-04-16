import React from "react";
import CButton from "../../../components/core/CButton";
import useProductStore from "../../../store/product.zustand";

const ItemDetail = (item) => {
  console.log("🚀 ~ file: ViewCart.jsx:6 ~ ItemDetail ~ item:", item)
  const { name } = item;
  return (
    <div className="w-full flex gap-4 my-2">
      <img
        src="https://secure-images.nike.com/is/image/DotCom/DR0453_001?align=0,1&cropN=0,0,0,0&resMode=sharp&bgc=f5f5f5&wid=150&fmt=jpg"
        alt=""
        className="max-w-full"
      />
      <div className="w-full">
        <div className="flex justify-between">
          <p>{item.shortName}</p>
          <p>$150.00</p>
        </div>
        <p className="text-gray-500 text-sm">Men's shoe</p>
        <p className="text-gray-500 text-sm">Air Jordan 1</p>
        <div className="flex gap-8">
          <p className="text-gray-500 text-sm">Size 10.5</p>
          <p className="text-gray-500 text-sm">
            Quantity{" "}
            <span>
              <input type="number" defaultValue={5} max={10} />
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

const ViewCart = () => {
  // Store
  const productStore = useProductStore((state) => state);
  console.log("ordersList", productStore.ordersList);
  return (
    <div className="flex justify-between max-w-[900px] mx-auto gap-4">
      {/* ITEMS */}
      <div className="w-2/3">
        <p>BAG</p>
        {!productStore.ordersList.lenght && (
          <p className="text-sm text-gray-500 font-semibold">No item found!</p>
        )}
        {productStore.ordersList.map((i, idx) => (
          <ItemDetail key={idx} item={i} />
        ))}
      </div>
      {/* PAYMENT DETAIL */}
      <div className="w-1/3 bg-slate-100 p-4">
        <p>PAYMENT DETAIL</p>
        <div className="font-semibold mb-4">Total: $150.00</div>
        <div className="flex flex-col gap-4">
          <CButton>Checkout</CButton>
          <CButton>Momo</CButton>
        </div>
      </div>
    </div>
  );
};

export default ViewCart;
