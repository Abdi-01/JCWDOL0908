import React from "react";

function RenderCategories(props) {
  const { categories } = props;
  const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

  return categories?.map((category) => {
    return (
      <div
        key={category?.id_category}
        style={{ backgroundImage: `url(${REACT_APP_SERVER_URL + category?.category_image})` }}
        className="h-full grid grid-cols-3 items-center px-4 bg-cover drop-shadow-md
      gap-2 lg:grid-cols-4 lg:px-6 lg:h-full bg-slate-100 shadow-md"
      >
        <div className="col-span-2 lg:col-span-3 text-left h-full flex items-center">
          <div className="relative">
            <p className=" text-slate-800 relative z-10">{category?.category_name}</p>
            <p className=" text-white absolute top-0 left-0 z-0 ml-[0.1rem] mt-[0.05rem] lg:mt-[0.1rem]">
              {category?.category_name}
            </p>
          </div>
        </div>
        <div className="h-1/3 md:h-1/4 grid grid-cols-2 gap-2">
          <button className="bg-slate-300">
            <i className="uil uil-pen"></i>
          </button>
          <button className="bg-red-600 text-white">
            <i className="uil uil-trash-alt"></i>
          </button>
        </div>
      </div>
    );
  });
}

export default RenderCategories;
