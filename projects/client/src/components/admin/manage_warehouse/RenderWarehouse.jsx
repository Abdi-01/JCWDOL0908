import React from "react";

function RenderWarehouse(props) {
  const { warehouses } = props;

  const cutString = (string) => {
    return string.length > 13 ? string.slice(0, 10) + "..." : string;
  };

  return warehouses.map((warehouse) => {
    return (
      <div
        className="row-span-1 grid lg:grid-cols-5
      grid-cols-6 items-center text-xs pl-2 lg:text-base"
      >
        <p className="col-span-1">{cutString(warehouse.warehouse_name)}</p>
        <p className="hidden lg:inline lg:col-span-1">address</p>
        <p className="col-span-2 text-center lg:text-left lg:col-span-1">
          {cutString(warehouse.type_city + " " + warehouse.city)}
        </p>
        <p className="col-span-2 lg:col-span-1">{cutString(warehouse.province)}</p>
        <p className="text-right">action</p>
      </div>
    );
  });
}

export default RenderWarehouse;
