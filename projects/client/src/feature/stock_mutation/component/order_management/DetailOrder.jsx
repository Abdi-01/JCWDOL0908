import React, { useEffect, useState } from "react";
import ClosedBtnModal from "../../../../components/ClosedBtnModal";
import ImageRender from "./ImageRender";
import DetailOrderBody from "./DetailOrderBody";
import { getListOfProductsInWarehouse } from "../../../admin_product";
import OrderButton from "./OrderButton";

function DetailOrder(props) {
  const { singleOrder, setSingleItemClicked } = props;
  const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const [productsStock, setProductsStock] = useState([]);
  const [isStockEnough, setIsStockEnough] = useState(true);

  useEffect(() => {
    (async () => {
      let listOfProduct = singleOrder.transaction_product_rlts.map((data) => {
        return data.id_product;
      });
      listOfProduct = JSON.stringify(listOfProduct);
      const response = await getListOfProductsInWarehouse(listOfProduct, singleOrder.id_warehouse);
      setProductsStock([...response?.result]);
    })();
  }, []);

  const checkStockAndOrderQty = () => {
    const products = [...singleOrder.transaction_product_rlts].sort((a, b) => a.id_product - b.id_product);
    products.forEach((product, index) => {
      if (productsStock[index]?.stock < product.quantity) {
        setIsStockEnough(false);
      }
    });
  };

  useEffect(() => {
    checkStockAndOrderQty();
  }, [productsStock]);

  return (
    <div className="modal-background">
      <div className="modal-container w-5/6">
        <ClosedBtnModal setModal={setSingleItemClicked} />
        <div>
          <h1 className="modal-header-text">Detail Order</h1>
          <div className="h-[28rem] overflow-auto pr-4 pl-2 shadow-inner bg-slate-50">
            <div className="text-primary gap-2 flex flex-col ">
              {singleOrder.payment_proof !== null && (
                <ImageRender preview={REACT_APP_SERVER_URL + singleOrder.payment_proof} alt="proof of payment" />
              )}
              <DetailOrderBody singleOrder={singleOrder} productsStock={productsStock} />
              <OrderButton singleOrder={singleOrder} isStockEnough={isStockEnough} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailOrder;
