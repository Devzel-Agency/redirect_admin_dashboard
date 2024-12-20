import React from "react";
import clsx from "clsx";

const Padding = ({ children, className }) => {
  return (
    <div className={clsx(className, "px-[1rem] md:px-[2rem] xl:px-[2.5rem] ")}>
      {children}
    </div>
  );
};

export default Padding;
