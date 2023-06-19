import React, { useEffect, useState } from "react";
import AddNewCategory from "./add_category/AddNewCategory";
import { getCategories } from "../../";
import RenderCategories from "./RenderCategories";
import Pagination from "./Pagination";

function CategoryBody() {
  const [isNewCategoryClicked, setNewCategoryClicked] = useState(false);
  const [categories, setCategories] = useState({});
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    (async () => {
      const response = await getCategories(pageNum);
      await setCategories({ ...response });
    })();
  }, [pageNum]);

  useEffect(() => {
    (async () => {
      const response = await getCategories(pageNum);
      await setCategories({ ...response });
    })();
  }, []);

  return (
    <>
      {isNewCategoryClicked ? <AddNewCategory setNewCategoryClicked={setNewCategoryClicked} pageNum={pageNum} /> : null}
      <div className="row-span-6 grid gap-2 lg:gap-2">
        <div
          className="font-semibold text-slate-800 grid grid-rows-4 md:grid-rows-2
          md:grid-cols-2 items-start gap-2 text-sm lg:text-2xl md:text-lg lg:gap-6 pt-4"
        >
          <RenderCategories categories={categories?.categories} />
        </div>
      </div>
      <div className="row-span-1 flex text-center items-end lg:grid lg:grid-cols-2">
        <button
          onClick={() => setNewCategoryClicked(true)}
          className="bg-green-800 text-white px-2 py-1 text-base 
          font-semibold lg:w-1/3"
        >
          <i className="uil uil-plus"></i> New Category
        </button>
      </div>
      <div className="pagination-container">
        <Pagination setPageNum={setPageNum} pageNum={pageNum} totalPage={categories?.totalPage} />
      </div>
    </>
  );
}

export default CategoryBody;
