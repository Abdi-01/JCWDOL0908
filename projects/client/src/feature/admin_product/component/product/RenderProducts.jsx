import React from "react";

function RenderProducts(props) {
  const { products, roleAdmin, setDeleteClicked, setSingleProduct } = props;
  const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const delBtnHandler = (product) => {
    setDeleteClicked(true);
    setSingleProduct({ ...product });
  };

  return products?.map((product) => {
    return (
      <div
        key={product?.id_product}
        style={{ backgroundImage: `url(${REACT_APP_SERVER_URL + product?.product_image})` }}
        className="h-full grid grid-cols-3 items-center px-4 bg-cover drop-shadow-md
      gap-2 lg:grid-cols-4 lg:px-6 lg:h-full bg-slate-100 shadow-md transition hover:scale-105"
      >
        <div className="col-span-2 lg:col-span-3 text-left h-full flex items-center">
          <div className="relative">
            <p className=" text-slate-800 relative z-10 ">{product?.product_name}</p>
            <p className=" text-white absolute top-0 left-0 z-0 -ml-[0.1rem] mt-[0.08rem] lg:mt-[0.1rem]">
              {product?.product_name}
            </p>
          </div>
        </div>
        <div className="h-1/3 md:h-1/4 grid grid-cols-2 gap-2">
          <button
            className="bg-slate-300 disabled:bg-white disabled:border-2 lg:disabled:border-4
            disabled:border-slate-300 disabled:cursor-not-allowed disabled:text-slate-300"
            // onClick={() => editBtnHandler(category)}
            disabled={roleAdmin.role_admin !== "super-admin"}
          >
            <i className="uil uil-pen"></i>
          </button>
          <button
            onClick={() => delBtnHandler(product)}
            className="bg-red-600 text-white disabled:bg-white disabled:border-2 lg:disabled:border-4
            disabled:border-slate-300 disabled:cursor-not-allowed disabled:text-slate-300"
            disabled={roleAdmin.role_admin !== "super-admin"}
          >
            <i className="uil uil-trash-alt"></i>
          </button>
        </div>
      </div>
    );
  });
}

export default RenderProducts;
