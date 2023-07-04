import React, { memo } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const CCarousel = memo((props) => {
  const { items = [], renderItem, responsive = [4, 2, 1] } = props;

  const [desktop, tablet, mobile] = responsive;

  const responsiveConfig = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: desktop,
      paritialVisibilityGutter: 60,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: tablet,
      paritialVisibilityGutter: 50,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: mobile,
      paritialVisibilityGutter: 30,
    },
  };
  return (
    <div className="w-full h-full">
      <Carousel arrows={<></>} responsive={responsiveConfig} itemClass="mr-4">
        {items.map((i) => renderItem(i))}
      </Carousel>
    </div>
  );
});

export default CCarousel;
