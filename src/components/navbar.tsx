import LogoutModal from "./logout";
import React from "react";
import { FaSearch, FaUser } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="w-full  flex justify-between items-center h-14 px-4 bg-blue-300 shadow-md">
      <div className="flex items-center space-x-3">
        {/* Logo or Icon */}
        <p className="text-white text-xl md:text-3xl font-bold pl-10 md:pl-2">
          Pannel d'Administration
        </p>
      </div>

     

      {/* User and Logout */}
      <div className="flex items-center space-x-4">
        <LogoutModal />
      </div>
    </div>
  );
};

export default Navbar;
