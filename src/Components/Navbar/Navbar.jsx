import React from "react";
import Logo from "../Logo/Logo";
import { Link, useLocation } from "react-router-dom";
import { TbBrandWebflow } from "react-icons/all";
const Navbar = ({ links }) => {
  const location = useLocation();
  return (
    <nav className="bg-[#010101]/80 h-[3.1rem] flex justify-between items-center px-3 fixed z-10 w-full backdrop-blur-[1px]">
      <div className=" w-30">
        <Logo
          icon={<TbBrandWebflow size={30} className="text-red-600" />}
          title={"talks"}
        />
      </div>
      <div className="w-3/5 flex justify-start items-center gap-x-5 h-10 text-white">
        {links.map((item, index) => {
          return (
            <Link
              to={item.linkname}
              key={index}
              className={` ${
                location.pathname === item.linkname &&
                " border-red-700 border-b-[3px] rounded-none text-red-700 hover:bg-transparent transition-all linear duration-100"
              } cursor-pointer rounded-md hover:bg-red-700 h-[2.5rem] w-[3.5rem] font-[400] font-sans uppercase text-lg flex justify-center items-center`}>
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
