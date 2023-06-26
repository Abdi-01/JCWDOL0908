import React from "react";

function RenderProduct() {
  return (
    <div
      className="row-span-1 grid lg:grid-cols-5
    grid-cols-6 items-center text-xs pl-2 lg:text-base bg-slate-100"
    >
      <p className="col-span-1">halo</p>
      <p className="hidden lg:inline lg:col-span-1">halo</p>
      <p className="col-span-2 text-center lg:text-left lg:col-span-1">halo</p>
      <p className="col-span-2 lg:col-span-1 text-center">halo</p>
      <div className="col-span-1 grid grid-cols-3 h-full lg:grid-cols-4">
        <button
          className="col-span-2 bg-slate-300 text-slate-800 h-full col-start-2 md:col-span-1 md:col-start-3 lg:col-start-4"
          // onClick={() => editBtnClicked(index)}
        >
          <i className="uil uil-pen"></i>
        </button>
      </div>
    </div>
  );
}

export default RenderProduct;
