import React from "react";

function Header() {
  return (
    <div className="w-full text-center row-span-2 grid grid-rows-3 gap-8">
      <h1
        className="font-semibold text-2xl pt-8 row-span-2 
      text-slate-800 lg:text-3xl"
      >
        Warehouse Management
      </h1>
      <div className="grid grid-cols-2 row-span-1 gap-20 lg:grid-cols-4 lg:gap-8">
        <button
          className="py-1 px-1 bg-slate-800 text-white text-sm 
          font-semibold hover:bg-slate-900 lg:text-lg"
        >
          Warehouse <i className="uil uil-plus"></i>
        </button>
      </div>
    </div>
  );
}

export default Header;
