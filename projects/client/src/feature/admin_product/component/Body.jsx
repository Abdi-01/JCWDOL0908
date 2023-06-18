import React from "react";
import CategoryBody from "./categories/CategoryBody";
import ProductBody from "./product/ProductBody";

function Body(props) {
  const { isCategoryClicked, isProductClicked } = props;
  return <div className="row-span-6 grid grid-rows-8">{isCategoryClicked ? <CategoryBody /> : <ProductBody />}</div>;
}

export default Body;
