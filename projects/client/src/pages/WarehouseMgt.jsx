import React, { useEffect, useState } from "react";
import LayoutAdmin from "../components/LayoutAdmin";
import Header from "../components/admin/manage_warehouse/Header";
import Body from "../components/admin/manage_warehouse/Body";
import { getWarehouses } from "../feature/admin/AdminWarehouseSlice";

function WarehouseMgt() {
  const [warehouses, setWarehouses] = useState([]);
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    (async () => {
      const result = await getWarehouses();
      setWarehouses([...result]);
    })();
  }, []);

  return (
    <LayoutAdmin>
      <div className="grid grid-rows-8 maxvh pt-2 pb-6 px-8 gap-4">
        <Header />
        <Body pageNum={pageNum} warehouses={warehouses} />
      </div>
    </LayoutAdmin>
  );
}

export default WarehouseMgt;
