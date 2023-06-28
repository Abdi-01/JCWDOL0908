import React, { useState } from "react";
import NavbarRenderIcon from "./NavbarRenderIcon";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoggedInAdminDataBack } from "../feature/admin_auth/slice/AdminLogInSlice";

function NavbarAdmin() {
  const [toggleNav, setToggleNav] = useState(false);
  const [isClicked, setClicked] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const listNav = [
    {
      class: "uil uil-cog",
      text: "user-mgt",
      navlink: "/admin/dashboard/user-management",
    },
    {
      class: "uil uil-estate",
      text: "warehouse-mgt",
      navlink: "/admin/dashboard/warehouse-management",
    },
    {
      class: "uil uil-suitcase",
      text: "product-mgt",
      navlink: "/admin/dashboard/product-management",
    },
    {
      class: "uil uil-file-graph",
      text: "product-order",
      navlink: "/admin/dashboard/order",
    },
    {
      class: "uil uil-analytics",
      text: "product-report",
      navlink: "/admin/dashboard/report",
    },
  ];

  const logoutBtnHandler = () => {
    localStorage.removeItem("admin_token");
    dispatch(setLoggedInAdminDataBack());
    navigate("/");
  };

  const onClickNavbarBtn = (navlink) => {
    navigate(navlink);
    setClicked(navlink);
  };

  return (
    <>
      <div
        className={
          toggleNav
            ? `visible z-50 md:top-0 md:left-0 absolute bottom-0 w-full px-4 shadow-primary shadow-2xl 
            rounded-t-2xl md:px-6 md:w-fit md:col-span-2 md:h-screen md:shadow-primary md:shadow-md
            md:py-0 lg:px-10 md:fixed md:visible bg-slate-50 md:rounded-none`
            : `invisible z-50 md:top-0 md:left-0 absolute bottom-0 w-full px-4 shadow-primary shadow-2xl 
            rounded-t-2xl md:px-6 md:w-fit md:col-span-2 md:h-screen md:shadow-primary md:shadow-md
            md:py-0 lg:px-10 md:fixed md:visible bg-slate-50 md:rounded-none`
        }
      >
        <div className="relative">
          <h1
            onClick={() => navigate("/admin/dashboard")}
            className="invisible md:visible md:text-lg text-primary
            md:pt-10 md:pb-8 scale-y-110 font-bold lg:text-2xl hover:cursor-pointer font-title"
          >
            WarehouseKu
          </h1>
          <ul
            className="grid grid-cols-3 gap-4 text-lg text-slate-700 md:grid 
            md:grid-rows-6 md:grid-cols-1 md:gap-0 md:text-2xl py-4 lg:text-3xl"
          >
            <NavbarRenderIcon listNav={listNav} onClickNavbarBtn={onClickNavbarBtn} isClicked={isClicked} />
            <li
              className="text-center md:py-4 text-red-600 hover:text-white hover:bg-red-600 hover:cursor-pointer"
              onClick={logoutBtnHandler}
            >
              <i className="uil uil-signout"></i>
              <h2 className=" text-sm md:text-lg">logout</h2>
            </li>
          </ul>
          <span
            className="md:invisible absolute top-2 right-0 text-red-900 text-sm hover:cursor-pointer"
            onClick={() => {
              setToggleNav(false);
            }}
          >
            <i className="uil uil-times-circle"></i>
          </span>
        </div>
      </div>
      <div
        className={
          toggleNav
            ? `invisible absolute bottom-2 right-2 text-2xl text-center
            md:invisible hover:cursor-pointer z-0 h-10 w-10 bg-primary
             self-center text-white rounded-full flex flex-row justify-center
              items-center`
            : `visible absolute bottom-2 right-2 text-2xl text-center
            md:invisible hover:cursor-pointer z-0 h-10 w-10 bg-primary
             self-center text-white rounded-full flex flex-row justify-center
              items-center`
        }
        onClick={() => {
          setToggleNav(true);
        }}
      >
        <i className="uil uil-align-center-alt"></i>
      </div>
    </>
  );
}

export default NavbarAdmin;
