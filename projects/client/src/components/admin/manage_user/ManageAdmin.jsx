import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAdmin, getSingleWarehouseAdmin, getWarehouseCities } from "../../../feature/admin/AdminSlice";
import RenderAdminsData from "./all_admin/RenderAdminsData";
import Pagination from "./all_admin/Pagination";
import AddNewAdmin from "./all_admin/create_data/AddNewAdmin";
import DeleteAdminModal from "./all_admin/delete_data/DeleteAdminModal";
import EditAdminModal from "./all_admin/edit_data/EditAdminModal";

function ManageAdmin(props) {
  let { page } = props;
  const dispatch = useDispatch();
  const [editClicked, setEditClicked] = useState(false);
  const [deletedClicked, setDeleteClicked] = useState(false);
  const [warehouseCities, setWarehouseCities] = useState([]);
  const [addNewAdminClicked, setNewAdminClicked] = useState(false);

  const editBtnHndler = async (id) => {
    await dispatch(getSingleWarehouseAdmin(id));
    setEditClicked(true);
  };

  const getDataWarehouseCities = async () => {
    const data = await getWarehouseCities();
    setWarehouseCities([...data]);
  };

  useEffect(() => {
    (async () => {
      await dispatch(getAllAdmin(page));
    })();
  }, [page]);

  useEffect(() => {
    getDataWarehouseCities();
  }, []);

  useEffect(() => {
    getDataWarehouseCities();
  }, [editClicked]);

  const addPageNum = () => {
    props.setPage(page + 1);
  };

  const minusPageNum = () => {
    props.setPage(page - 1);
  };

  const allAdmin = useSelector((state) => state.admin.allAdmin);

  return (
    <>
      {editClicked ? <EditAdminModal setModal={setEditClicked} page={page} warehouseCities={warehouseCities} /> : null}
      {addNewAdminClicked ? (
        <AddNewAdmin setNewAdminClicked={setNewAdminClicked} warehouseCities={warehouseCities} page={page} />
      ) : null}
      {deletedClicked ? <DeleteAdminModal setDeleteClicked={setDeleteClicked} page={page} /> : null}
      <div className="row-span-6 grid grid-rows-8 gap-2">
        <div className="row-span-6 grid grid-rows-6">
          <div className="row-span-1 flex text-center items-center">
            <h1 className="text-lg font-semibold lg:text-xl">Admin-Warehouse List</h1>
          </div>
          <div className=" row-span-5 grid grid-rows-8 gap-3 lg:gap-2">
            <div
              className="row-span-1 font-semibold grid lg:grid-cols-5
              grid-cols-6 items-center text-xs pl-2 lg:text-base"
            >
              <p className="col-span-1">name</p>
              <p className="hidden lg:inline lg:col-span-1">phone</p>
              <p className="col-span-2 text-center lg:text-left lg:col-span-1">warehouse</p>
              <p className="col-span-2 lg:col-span-1">location</p>
              <p className="text-right">action</p>
            </div>
            <RenderAdminsData allAdmin={allAdmin} editBtnHndler={editBtnHndler} setDeleteClicked={setDeleteClicked} />
          </div>
        </div>
        <div className="row-span-1 grid items-center">
          <button
            className="bg-green-800 text-white px-2 py-1 text-base 
          font-semibold lg:w-1/3"
            onClick={() => setNewAdminClicked(true)}
          >
            <i className="uil uil-plus"></i> New Admin
          </button>
        </div>
        <div
          className="items-center row-span-1 py-2 grid grid-cols-7 text-slate-800
          text-lg lg:grid-cols-11 lg:font-bold"
        >
          <Pagination minusPageNum={minusPageNum} page={page} addPageNum={addPageNum} allAdmin={allAdmin} />
        </div>
      </div>
    </>
  );
}

export default ManageAdmin;
