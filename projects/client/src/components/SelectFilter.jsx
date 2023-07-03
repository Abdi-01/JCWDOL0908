import React from "react";

function SelectFilter(props) {
  const { filterOnChangeHandle, text, value } = props;

  return (
    <select
      onChange={filterOnChangeHandle}
      className="px-1 py-1 w-full shadow-black shadow-sm md:py-1 md:px-2 tracking-tight"
      name={`${text}-filter`}
      id={`${text}-filter`}
      value={value || ""}
    >
      <option value={""}>select {text}</option>
      {props.children}
    </select>
  );
}

export default SelectFilter;
