import React, { useEffect, useState } from "react";
import LayoutAdmin from "../components/LayoutAdmin";
import Header from "../components/admin/manage_warehouse/Header";
import Body from "../components/admin/manage_warehouse/Body";
import { getWarehouses } from "../feature/admin/AdminWarehouseSlice";

function WarehouseMgt() {
  const [warehouses, setWarehouses] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [totalPageWarehouse, setTotalPage] = useState(1);

  useEffect(() => {
    (async () => {
      const data = await getWarehouses(pageNum);
      const { result, totalPage } = data;
      setTotalPage(totalPage);
      setWarehouses([...result]);
    })();
  }, []);

  return (
    <LayoutAdmin>
      <div className="grid grid-rows-8 maxvh pt-2 pb-6 px-8 gap-4">
        <Header />
        <Body
          pageNum={pageNum}
          warehouses={warehouses}
          setWarehouses={setWarehouses}
          setTotalPage={setTotalPage}
          totalPageWarehouse={totalPageWarehouse}
        />
      </div>
    </LayoutAdmin>
  );
}

export default WarehouseMgt;
