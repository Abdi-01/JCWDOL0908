import React, { useEffect, useState } from "react";
import LayoutAdmin from "../components/LayoutAdmin";
import HeaderStock from "../feature/admin_product/component/manage_stock/HeaderStock";
import BodyStock from "../feature/admin_product/component/manage_stock/BodyStock";
import { getCategories } from "../feature/admin_product";

function ManageStock() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await getCategories();
      setCategories([...response.categories]);
    })();
  }, []);

  return (
    <LayoutAdmin>
      <div className="grid grid-rows-8 maxvh pt-2 pb-6 px-8 gap-4">
        <HeaderStock categories={categories} />
        <BodyStock />
      </div>
    </LayoutAdmin>
  );
}

export default ManageStock;
