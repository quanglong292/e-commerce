import React from "react";

const SectionHeader = ({ children, ...restProps }) => {
  return (
    <p className={"text-2xl uppercase mb-4 " + restProps.className}>
      {children}
    </p>
  );
};

export default SectionHeader;
