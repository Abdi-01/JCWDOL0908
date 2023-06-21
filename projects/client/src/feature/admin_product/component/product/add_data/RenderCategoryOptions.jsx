import React from "react";

function RenderCategoryOptions({ categories }) {
  return categories?.map((category) => {
    return (
      <option key={category.id_category} value={category.id_category}>
        {category.category_name}
      </option>
    );
  });
}

export default RenderCategoryOptions;
