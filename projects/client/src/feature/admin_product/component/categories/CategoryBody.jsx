import React, { useState } from "react";
import AddNewCategory from "./add_category/AddNewCategory";

function CategoryBody() {
  const [isNewCategoryClicked, setNewCategoryClicked] = useState(false);

  return (
    <>
      {isNewCategoryClicked ? <AddNewCategory setNewCategoryClicked={setNewCategoryClicked} /> : null}
      <div className="row-span-6 grid gap-2 lg:gap-2">
        <div
          className="font-semibold grid text-slate-800 grid-rows-4
          grid-cols-2 items-start text-sm lg:text-lg gap-3 lg:gap-8 pt-4"
        >
          <div
            className="h-5/6 grid grid-cols-3 items-center bg-slate-100 px-2
            gap-2 lg:grid-cols-4 lg:px-4 lg:h-full"
          >
            <h1 className="col-span-2 lg:col-span-3 text-center">Meja</h1>
            <div className="grid grid-cols-2 gap-1">
              <button className="bg-slate-300">
                <i className="uil uil-pen"></i>
              </button>
              <button className="bg-red-600 text-white">
                <i className="uil uil-trash-alt"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row-span-1 flex text-center items-center lg:grid lg:grid-cols-2">
        <button
          onClick={() => setNewCategoryClicked(true)}
          className="bg-green-800 text-white px-2 py-1 text-base 
          font-semibold lg:w-1/3"
        >
          <i className="uil uil-plus"></i> New Category
        </button>
      </div>
      <div className="pagination-container">Pagination</div>
    </>
  );
}

export default CategoryBody;
