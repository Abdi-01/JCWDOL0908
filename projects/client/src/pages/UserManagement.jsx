import React, { useEffect, useState } from "react";
import LayoutAdmin from "../components/LayoutAdmin";
import { useDispatch } from "react-redux";
import { getAllAdmin } from "../feature/admin";
import ManageAdmin from "../feature/admin/component/ManageAdmin";
import UserMgtUserData from "../feature/admin/component/UserMgtUserData";

function UserManagement() {
  const [allDataBtnClicked, setAllDataBtnClicked] = useState(true);
  const [mngAdminBtnClicked, setMngAdminBtnClicked] = useState(false);
  const [adminPageNum, setAdminPageNum] = useState(1);
  const dispatch = useDispatch();

  const getData = async () => {
    await dispatch(getAllAdmin(adminPageNum));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <LayoutAdmin>
      <div className="grid grid-rows-8 maxvh pt-2 pb-6 px-8 gap-4">
        <div className="w-full text-center row-span-2 grid grid-rows-3 gap-8">
          <h1
            className="font-semibold text-2xl pt-8 row-span-2
          text-primary lg:text-3xl font-title"
          >
            User Management
          </h1>
          <div className="grid grid-cols-2 row-span-1 gap-20 lg:grid-cols-4 lg:gap-8">
            <button
              className="py-1 px-1 bg-primary text-white text-sm 
              font-semibold hover:bg-slate-800 disabled:bg-slate-100 disabled:text-slate-400 
               lg:text-lg"
              disabled={allDataBtnClicked}
              onClick={() => {
                setMngAdminBtnClicked(false);
                setAllDataBtnClicked(true);
              }}
            >
              All User
            </button>
            <button
              className="py-1 px-1 bg-white text-primary text-sm 
            font-semibold border-primary border-2 hover:bg-slate-950 
           hover:text-white disabled:bg-slate-100 disabled:text-slate-400
            disabled:border-slate-400 lg:text-lg"
              disabled={mngAdminBtnClicked}
              onClick={() => {
                setMngAdminBtnClicked(true);
                setAllDataBtnClicked(false);
              }}
            >
              Manage Admin
            </button>
          </div>
        </div>
        {allDataBtnClicked ? <UserMgtUserData /> : <ManageAdmin page={adminPageNum} setPage={setAdminPageNum} />}
      </div>
    </LayoutAdmin>
  );
}

export default UserManagement;
