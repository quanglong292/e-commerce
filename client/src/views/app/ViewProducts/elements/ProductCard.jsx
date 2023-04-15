import React, { lazy, useState } from "react";
import CButton from "../../../../components/core/CButton";

const QuickViewCard = lazy(() => import("./QuickViewCard"));

const cloneItem = {
  box_condition: "good_condition",
  brand_name: "Air Jordan",
  category: ["basketball"],
  collection_slugs: [
    "air-jordan-1",
    "goat-clean",
    "jordan",
    "jordan-1",
    "rose-bowl-flea-market",
    "the-ones-that-started-it-all",
  ],
  color: "Black",
  designer: "Peter Moore",
  details: "Black/White-Medium Grey",
  gender: ["men"],
  grid_picture_url:
    "https://image.goat.com/375/attachments/product_template_pictures/images/011/119/994/original/218099_00.png.png",
  has_picture: true,
  has_stock: true,
  id: 218099,
  keywords: [],
  main_picture_url:
    "https://image.goat.com/750/attachments/product_template_pictures/images/011/119/994/original/218099_00.png.png",
  midsole: "Air",
  name: "Air Jordan 1 Retro High OG 'Shadow' 2018",
  nickname: "Shadow",
  original_picture_url:
    "https://image.goat.com/attachments/product_template_pictures/images/011/119/994/original/218099_00.png.png",
  product_template_id: 218099,
  release_date: "2018-04-14T23:59:59.000Z",
  release_date_unix: 1523750399,
  release_year: 2018,
  retail_price_cents: 16000,
  shoe_condition: "used",
  silhouette: "Air Jordan 1",
  size_range: [
    10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17,
    17.5, 18, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5,
  ],
  sku: "555088 013",
  slug: "air-jordan-1-retro-high-og-shadow-2018-555088-013",
  status: "active",
  story_html:
    "<p>This Nike Air Jordan 1 Retro High OG &#39;Shadow&#39; 2018 is a retro re-release of an original 1985 colorway. The shoe features a black and medium grey leather upper with a white midsole and black outsole. It also features OG Nike Air branding on the tongue and the Wings logo on the ankle collar. It was last retroed in 2013, and a low-top version dropped in 2015.</p>\\n",
  upper_material: "Leather",
};

const ProductCard = (props) => {
  const { item } = props;
  console.log("🚀 ~ file: ProductCard.jsx:56 ~ ProductCard ~ item:", item);
  // const item = cloneItem
  const [isHover, setHover] = useState(false);
  const [quickViewId, setQuickViewId] = useState(null);

  function toggle({ type }) {
    setHover(!(type === "mouseleave"));
  }

  return (
    <>
      <div className="w-full">
        <div
          onMouseEnter={toggle}
          onMouseLeave={(e) => toggle(e)}
          className="w-full relative"
        >
          <img
            width={300}
            height={250}
            src={item.bannerImage}
            className="w-[300px] h-[250px] mx-auto rounded-md hover:bg-slate-300 cursor-pointer relative object-contain"
          />
          {isHover && (
            <div className="w-full h-full absolute top-0 left-0 bg-slate-300/50 rounded-md">
              <div className="w-full h-full flex flex-col justify-center items-center gap-2">
                <CButton
                  type="primary"
                  className="w-[114px]"
                  onMouseEnter={toggle}
                >
                  Detail
                </CButton>
                <CButton
                  type="primary"
                  className="w-[114px]"
                  onMouseEnter={toggle}
                  onClick={() => setQuickViewId(item.id)}
                >
                  Quick view
                </CButton>
              </div>
            </div>
          )}
        </div>
        <div className="w-full mt-2">
          <p className="font-semibold">{item.name}</p>
          <p
            className={
              "italic text-sm " +
              (item.available ? "text-green-500" : "text-yellow-500")
            }
          >
            {item.available ? "Available" : "Out of stock"}
          </p>
        </div>
      </div>
      {quickViewId && (
        <QuickViewCard
          item={item}
          isShow={quickViewId}
          onCancel={() => setQuickViewId(null)}
        />
      )}
    </>
  );
};

export default ProductCard;
