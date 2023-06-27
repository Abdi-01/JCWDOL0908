import React from "react";

function EditModal(props) {
  const { setEditClicked } = props;
  return (
    <div className="modal-background">
      <div className="modal-container">
        <button onClick={() => setEditClicked(false)} className="close-btn-modal">
          <i className="uil uil-times-circle"></i>
        </button>
      </div>
    </div>
  );
}

export default EditModal;
