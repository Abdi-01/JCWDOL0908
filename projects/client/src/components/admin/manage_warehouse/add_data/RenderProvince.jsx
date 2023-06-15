import React from "react";

function RenderProvince(props) {
  const { provinceList } = props;
  return provinceList.map((province) => {
    return <option value={`${province.id_province}:::${province.province}`}>{province.province}</option>;
  });
}

export default RenderProvince;
