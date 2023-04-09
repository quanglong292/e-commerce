import React, { memo } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const CCarousel = memo((props) => {
  const { items, clickItem, renderItem } = props;
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      paritialVisibilityGutter: 60,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      paritialVisibilityGutter: 50,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      paritialVisibilityGutter: 30,
    },
  };
  return (
    <div className="w-full h-full">
      <Carousel responsive={responsive} itemClass="mr-4">
        {items.map((i) => renderItem(i))}
      </Carousel>
    </div>
  );
});

export default CCarousel;
