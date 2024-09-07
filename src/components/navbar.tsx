import LogoutModal from "./logout";
import Link from "next/link";
import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 shadow-md fixed w-full z-10 py-4 pl-16 lg:pl-1">
          <div className="flex items-center">
            <Link href="/dashboard" className="flex-shrink-0 ">
              <h1 className="text-white text-xl md:text-2xl font-bold">
                Panneau d'Administration
              </h1> </Link>
        
      </div>
    </nav>
  );
};

export default Navbar;
