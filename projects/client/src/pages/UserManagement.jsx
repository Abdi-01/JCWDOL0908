import React, { useEffect, useState } from "react";
import LayoutAdmin from "../components/LayoutAdmin";
import { useDispatch } from "react-redux";
import { getAllAdmin } from "../feature/admin";
import ManageAdmin from "../feature/admin/component/ManageAdmin";
import UserMgtUserData from "../feature/admin/component/UserMgtUserData";
import AdminHeaderPageLayout from "../components/AdminHeaderPageLayout";

function UserManagement() {
  const [allDataBtnClicked, setAllDataBtnClicked] = useState(true);
  const [mngAdminBtnClicked, setMngAdminBtnClicked] = useState(false);
  const [adminPageNum, setAdminPageNum] = useState(1);
  const headerTitle = ["User", "Admin"];
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
        <AdminHeaderPageLayout
          firstSubPageClicked={allDataBtnClicked}
          setFirstSubPage={setAllDataBtnClicked}
          SecondSubPageClicked={mngAdminBtnClicked}
          setSecondSubPage={setMngAdminBtnClicked}
          headerTitle={headerTitle}
        />
        {allDataBtnClicked ? <UserMgtUserData /> : <ManageAdmin page={adminPageNum} setPage={setAdminPageNum} />}
      </div>
    </LayoutAdmin>
  );
}

export default UserManagement;
