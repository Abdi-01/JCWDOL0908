import React, { useEffect, useState } from "react";
import Pagination from "../Pagination";
import CreateButton from "../CreateButton";
import Filter from "./Filter";
import AddDataModal from "./add_data/AddDataModal";
import { getCategories } from "../../";

function ProductBody(props) {
  const { admin } = props;
  const [pageNum, setPageNum] = useState(1);
  const [isNewProductClicked, setNewProductClicked] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await getCategories();
      setCategories([...response.categories]);
    })();
  }, []);

  return (
    <>
      {isNewProductClicked ? (
        <AddDataModal setNewProductClicked={setNewProductClicked} categories={categories} />
      ) : null}
      <div className="product-and-category-body-container grid grid-rows-10">
        <div className="row-span-1 flex items-end text-sm">
          <Filter />
        </div>
        <div className=" row-span-9 render-data-container">render data</div>
      </div>
      <div className="row-span-1 flex gap-4 justify-between text-center items-end ">
        <button
          onClick={() => setNewProductClicked(true)}
          className="bg-green-800 text-white px-2 py-1 text-base 
          font-semibold lg:w-1/5 disabled:bg-white disabled:border-2 lg:disabled:border-4
          disabled:border-slate-300 disabled:cursor-not-allowed disabled:text-slate-300"
          disabled={admin?.role_admin !== "super-admin"}
        >
          <i className="uil uil-plus"></i> New Product
        </button>
        <button
          className="bg-slate-800 text-white px-2 py-1 text-base 
          font-semibold lg:w-1/5 disabled:bg-white disabled:border-2 lg:disabled:border-4
          disabled:border-slate-300 disabled:cursor-not-allowed disabled:text-slate-300"
        >
          Manage Stock
        </button>
      </div>
      <div className="pagination-container">
        <Pagination
          setPageNum={setPageNum}
          pageNum={pageNum}
          //  totalPage={categories?.totalPage}
        />
      </div>
    </>
  );
}

export default ProductBody;
