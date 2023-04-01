import React, { memo } from "react";

const Logo = memo(({ className }) => {
  return (
    <div className={"w-[54px] h-[25px] " + className}>
      <div className="italic font-bold relative drop-shadow-md">
        <span className="absolute top-0 left-0 z-30 text-blue-500">Mike!</span>
        <span className="absolute top-0 left-[2px] z-20 text-blue-300">
          Mike!
        </span>
        <span className="absolute top-0 left-[4px] z-10 text-blue-200">
          Mike!
        </span>
      </div>
    </div>
  );
});

export default Logo;
