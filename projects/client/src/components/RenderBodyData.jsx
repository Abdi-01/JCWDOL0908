import React from "react";

function RenderBodyData(props) {
  return (
    <div className="row-span-10 grid grid-rows-8 gap-2 lg:gap-2">
      <div
        className="row-span-1 font-semibold grid lg:grid-cols-5
        grid-cols-6 items-end text-xs pl-2 md:text-sm lg:text-base"
      >
        <p className="col-span-1">name</p>
        <p className="hidden lg:inline lg:col-span-1">weight (kg)</p>
        <p className="col-span-2 text-center lg:text-left lg:col-span-1">stock</p>
        <p className="col-span-2 lg:col-span-1 text-center">booked qty</p>
        <p className="text-right">action</p>
      </div>
      {props.children}
    </div>
  );
}

export default RenderBodyData;
