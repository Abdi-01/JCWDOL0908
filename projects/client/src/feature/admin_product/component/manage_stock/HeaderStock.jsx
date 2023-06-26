import React, { useState } from "react";
import SearchBar from "../../../../components/SearchBar";
import Filter from "../Filter";

function HeaderStock(props) {
  const { categories } = props;
  const [isSearchBtnClicked, setSearchBtnBlicked] = useState(false);

  return (
    <div className="w-full text-center row-span-2 grid grid-rows-4">
      <h1
        className="font-semibold text-2xl  pt-8  row-span-2
        text-slate-800 lg:text-3xl"
      >
        Stock Management
      </h1>
      <div
        className="row-span-2 grid grid-rows-3 text-sm place-content-start md:row-span-1 md:row-start-4 
       md:flex md:flex-row md:gap-4 md:items-center md:justify-between md:w-full"
      >
        <div className="row-start-3 row-span-1">
          <div className="md:w-full">
            <SearchBar />
          </div>
        </div>
        <div className=" row-start-1 pt-4 row-span-1 col-span-1 md:pt-0 md:">
          <Filter categories={categories} />
        </div>
      </div>
    </div>
  );
}

export default HeaderStock;
