import React from "react";

function AddNewCategory(props) {
  const { setNewCategoryClicked } = props;
  return (
    <div className="modal-background">
      <div className="modal-container">
        <button onClick={() => setNewCategoryClicked(false)} className="close-btn-modal">
          <i className="uil uil-times-circle"></i>
        </button>
        <div>
          <h1 className="my-4 font-bold">Create Category</h1>
        </div>
      </div>
    </div>
  );
}

export default AddNewCategory;
