import React from "react";
import Pagination from "../Pagination";
import RenderProduct from "./RenderProduct";

function BodyStock() {
  return (
    <div className="row-span-6 grid grid-rows-10">
      <div className="row-span-9 grid grid-rows-10 gap-2 lg:gap-2">
        <div
          className="row-span-1 font-semibold grid lg:grid-cols-5
              grid-cols-6 items-end text-xs pl-2 md:text-sm lg:text-base"
        >
          <p className="col-span-1">name</p>
          <p className="hidden lg:inline lg:col-span-1">weight (kg)</p>
          <p className="col-span-2 text-center lg:text-left lg:col-span-1">category</p>
          <p className="col-span-2 lg:col-span-1 text-center">stock</p>
          <p className="text-right">action</p>
        </div>
        <RenderProduct />
      </div>
      <div className="pagination-container">
        <Pagination />
      </div>
    </div>
  );
}

export default BodyStock;
