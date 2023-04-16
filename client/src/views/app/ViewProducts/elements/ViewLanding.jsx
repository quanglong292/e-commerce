import React, { memo, useEffect } from "react";
import CCarousel from "../../../../components/core/CCarousel";
import { useNavigate } from "react-router-dom";
import Footer from "../../../../components/layout/Footer";
import useProductStore from "../../../../store/product.zustand";

const ViewLanding = memo(() => {
  const navigate = useNavigate();
  const { products, fetch } = useProductStore((state) => state);

  useEffect(() => {
    if (!products.length) {
      fetch();
    }
  }, []);

  return (
    <div className="w-full h-full mb-12">
      <iframe
        src="https://www.youtube.com/embed/Sp3Xkbnvz50?autoplay=1&mute=1&loop=1"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullScreen
        className="max-w-full"
        style={{
          width: "100%",
          height: "650px",
        }}
      ></iframe>
      <div className="mt-24">
        <p className="text-2xl uppercase mb-2">Popular right now</p>
        <CCarousel
          renderItem={(i) => (
            <div
              onClick={() => navigate("/app/men")}
              className="w-[200px] h-[250px] rounded-md cursor-pointer flex justify-center items-center m-auto"
            >
              <img
                src={i.bannerImage}
                alt=""
                className="max-w-full object-contain"
              />
            </div>
          )}
          items={products.filter((i, idx) => idx < 5)}
        />
      </div>
      <div className="mt-24">
        <p className="text-2xl uppercase mb-2">category</p>
        <CCarousel
          clickItem={() => {
            navigate("/app/men");
          }}
          renderItem={(i) => (
            <div
              onClick={() => navigate("/app/men")}
              className="w-full h-[75px] bg-slate-100 rounded-md hover:bg-slate-200 cursor-pointer flex justify-center items-center font-semibold"
            >
              {i}
            </div>
          )}
          items={["TOP", "BOTTOM", "SHOE"]}
        />
      </div>
    </div>
  );
});

export default ViewLanding;
