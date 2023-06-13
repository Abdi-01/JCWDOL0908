import React from "react";
import RenderDetailData from "./DetailData";

function DeleteModal(props) {
  const { setIsDelBtnClicked, warehouseData } = props;
  console.log(warehouseData);
  return (
    <div
      className="fixed maxvh maxvw bg-white z-30 top-0 left-0 modal-container
  flex items-center justify-center"
    >
      <div
        className="px-4 w-5/6 bg-slate-50 relative md:translate-x-24 md:w-1/2
      lg:w-1/3 py-4"
      >
        <button
          onClick={() => setIsDelBtnClicked(false)}
          className="text-red-700 absolute top-0 right-1 font-bold text-xl"
        >
          <i className="uil uil-times-circle"></i>
        </button>
        <div className="grid grid-rows-8 gap-2">
          <h1 className="font-bold text-lg">Detail Warehouse ID: {warehouseData.id_warehouse}</h1>
          <div className="row-span-5 text-sm lg:text-base">
            <RenderDetailData warehouseData={warehouseData} />
          </div>
          <h3 className="text-center">
            Are you sure want to <i className="font-bold">delete</i> this data?
          </h3>
          <button className="bg-red-800 mx-auto text-white px-2 py-1 w-1/2">Delete</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
