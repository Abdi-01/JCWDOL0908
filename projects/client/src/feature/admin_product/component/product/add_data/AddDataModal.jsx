import React from "react";

function AddDataModal(props) {
  const { setNewProductClicked } = props;
  return (
    <div className="modal-background">
      <div className="modal-container">
        <button onClick={() => setNewProductClicked(false)} className="close-btn-modal">
          <i className="uil uil-times-circle"></i>
        </button>
        <div>
          <h1 className="my-4 font-bold">Create Product</h1>
          <form>
            <div>form data</div>
            <div></div>
            <div>submit button</div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddDataModal;
