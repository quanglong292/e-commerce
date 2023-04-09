import React, { memo } from "react";
import CCarousel from "../../../../components/core/CCarousel";
import SHOE_ITEMS from "../../../../utils/constants/shoes.constant.json";
import { useNavigate } from "react-router-dom";
import Footer from "../../../../components/layout/Footer";

const ViewLanding = memo(() => {
  const navigate = useNavigate();
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
              className="w-full h-auto mx-4 bg-slate-100 rounded-md hover:bg-slate-200 cursor-pointer"
            >
              <img src={i.main_picture_url} alt="" className="max-w-full" />
            </div>
          )}
          items={SHOE_ITEMS.sneakers.filter((i, idx) => idx < 5)}
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
              className="w-full h-[75px] mx-4 bg-slate-100 rounded-md hover:bg-slate-200 cursor-pointer flex justify-center items-center font-semibold"
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
