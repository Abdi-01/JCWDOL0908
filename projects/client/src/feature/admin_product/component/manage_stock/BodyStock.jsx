import React, { useState } from "react";
import Pagination from "../Pagination";
import RenderProduct from "./RenderProduct";
import EditModal from "./edit_data/EditModal";

function BodyStock(props) {
  const { productsList, totalPage, setPageNum, pageNum } = props;
  const [isEditClicked, setEditClicked] = useState(false);

  const editBtnHndler = async (id_product) => {
    setEditClicked(true);
  };

  return (
    <>
      {isEditClicked ? <EditModal setEditClicked={setEditClicked} /> : null}
      <div className="row-span-6 grid grid-rows-10">
        <div className="row-span-9 grid grid-rows-10 gap-2 lg:gap-2">
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
          <RenderProduct productsList={productsList} editBtnHndler={editBtnHndler} />
        </div>
        <div className="pagination-container">
          <Pagination pageNum={pageNum} setPageNum={setPageNum} totalPage={totalPage} />
        </div>
      </div>
    </>
  );
}

export default BodyStock;
