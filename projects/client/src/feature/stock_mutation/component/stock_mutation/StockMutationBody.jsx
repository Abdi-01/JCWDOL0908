import React, { useState } from "react";
import AdminPagination from "../../../../components/AdminPagination";
import RenderBodyData from "../../../../components/RenderBodyData";
import AddModal from "./add_request/AddModal";

function StockMutationBody(props) {
  const { admin } = props;
  const [createNewRequest, setNewRequest] = useState(false);
  const [pageNum, setPageNum] = useState(1);

  return (
    <>
      {createNewRequest ? <AddModal admin={admin} setNewRequest={setNewRequest} /> : null}
      <div className="grid grid-cols-3 gap-2 md:gap-4 md:grid-cols-4 text-xs md:text-sm lg:text-lg h-4/5">
        <button className="bg-slate-200">select warehouse</button>
        <button className="bg-slate-200">mutation-in</button>
        <div className="bg-slate-200 grid grid-cols-2">
          <button>start date</button>
          <button>end date</button>
        </div>
      </div>
      <div className="row-span-10 grid grid-rows-9 gap-2 lg:gap-2">
        <RenderBodyData>
          <h1>Data</h1>
        </RenderBodyData>
      </div>
      <div className="row-span-1 grid grid-cols-2 items-center">
        <button
          className="bg-primary text-white px-2 py-1 text-sm 
          font-semibold lg:w-1/3 disabled:bg-white disabled:border-2 lg:disabled:border-4
          disabled:border-primaryLight disabled:cursor-not-allowed disabled:text-slate-300"
          onClick={() => setNewRequest(true)}
        >
          <i className="uil uil-plus"></i> New Request
        </button>
      </div>
      <div className="pagination-container">
        <AdminPagination pageNum={pageNum} setPageNum={setPageNum} />
      </div>
    </>
  );
}

export default StockMutationBody;
