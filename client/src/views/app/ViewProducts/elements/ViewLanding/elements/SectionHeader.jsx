import React from "react";

const SectionHeader = ({ children, ...restProps }) => {
  return (
    <p className={"text-2xl uppercase mb-4 font-roboto font-semibold " + restProps.className}>
      {children}
    </p>
  );
};

export default SectionHeader;
