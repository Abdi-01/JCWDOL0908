import React from "react";
import Pagination from "./Pagination";
import RenderWarehouse from "./RenderWarehouse";

function Body(props) {
  const { pageNum, warehouses } = props;

  return (
    <div className="row-span-6 grid grid-rows-8">
      <div className="row-span-1 flex text-center items-center">
        <h1 className="text-lg font-semibold lg:text-xl">Warehouse List</h1>
      </div>
      <div className="row-span-6 grid grid-rows-8 gap-1 lg:gap-2">
        <div
          className="row-span-1 font-semibold grid lg:grid-cols-5
              grid-cols-6 items-center text-xs pl-2 lg:text-base"
        >
          <p className="col-span-1">warehouse</p>
          <p className="hidden lg:inline lg:col-span-1">address</p>
          <p className="col-span-2 text-center lg:text-left lg:col-span-1">city</p>
          <p className="col-span-2 lg:col-span-1">province</p>
          <p className="text-right">action</p>
        </div>
        <RenderWarehouse warehouses={warehouses} />
      </div>
      <Pagination pageNum={pageNum} />
    </div>
  );
}

export default Body;
