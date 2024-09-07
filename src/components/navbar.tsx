import LogoutModal from "./logout";
import Link from "next/link";
import React from "react";
import { FaSearch, FaUser } from "react-icons/fa";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 shadow-md fixed w-full z-10 pl-5">
      <div className="max-w-7xl mx-auto px-10 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/dashboard" className="flex-shrink-0 ">
              <h1 className="text-white text-xl md:text-2xl font-bold">
                Panneau d'Administration
              </h1>
            </Link>
          </div>

          <div className="flex items-center">           
            {/* <div className=" relative ">
              <LogoutModal />
            </div> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
