import React from "react";

function RenderCity(props) {
  const { cityList } = props;
  return cityList.map((city) => {
    return <option value={city.id_city + ":::" + city.city}>{city.type_city + " " + city.city}</option>;
  });
}

export default RenderCity;
