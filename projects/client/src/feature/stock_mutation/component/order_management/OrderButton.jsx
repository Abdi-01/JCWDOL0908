import React from "react";
import CancelButton from "./CancelButton";
import ProceedButton from "./ProceedButton";

function OrderButton(props) {
  const { singleOrder, isStockEnough, rejectBtnHandler, approveBtnHandler } = props;
  const { status_order } = singleOrder;
  console.log(singleOrder);

  const WaitingForPaymentButton = () => {
    return (
      <>
        <CancelButton />
      </>
    );
  };

  const PaymentConfirmationButton = () => {
    return (
      <>
        <ProceedButton text="reject" onClickFunction={rejectBtnHandler} />
        <ProceedButton text="approve" onClickFunction={approveBtnHandler} />
      </>
    );
  };

  const NotEnoughStockButton = () => {
    return (
      <>
        <CancelButton />
        <ProceedButton text="create-mutation" />
      </>
    );
  };

  const EnoughStockButton = () => {
    return (
      <>
        <CancelButton />
        <ProceedButton text="send order" />
      </>
    );
  };

  return (
    <div className="flex gap-6 mb-2 text-sm md:text-base">
      {(status_order === "waiting-for-payment" || status_order === "rejected") && <WaitingForPaymentButton />}
      {status_order === "payment-confirmation" && <PaymentConfirmationButton />}
      {status_order === "on-process" && <>{isStockEnough ? <EnoughStockButton /> : <NotEnoughStockButton />}</>}
    </div>
  );
}

export default OrderButton;
