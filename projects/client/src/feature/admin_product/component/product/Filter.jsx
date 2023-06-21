import React from "react";

function Filter() {
  return (
    <form className="text-sm font-medium">
      <select className="px-2 py-1 default:text-sm shadow-black shadow-sm" name="category-filter" id="category-filter">
        <option value={0}>select category</option>
      </select>
    </form>
  );
}

export default Filter;
