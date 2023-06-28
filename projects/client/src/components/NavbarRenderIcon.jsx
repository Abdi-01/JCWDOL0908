import React from "react";

function NavbarRenderIcon(props) {
  const { listNav, onClickNavbarBtn, isClicked } = props;
  return listNav.map((navItem) => {
    return (
      <li key={navItem.text} className={"text-center md:py-4 hover:text-white hover:bg-secondary hover:cursor-pointer"}>
        <button
          onClick={() => {
            onClickNavbarBtn(navItem.navlink);
          }}
        >
          <i className={navItem.class}></i>
          <h2 className=" text-sm md:text-lg">{navItem.text}</h2>
        </button>
      </li>
    );
  });
}

export default NavbarRenderIcon;
