// components/Navbar.tsx

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";


// Importer des icônes pour le menu

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [login, setLogin] = useState(true);

  const router = useRouter()
  const handleLogout = () => {
    localStorage.clear();
    router.push("/login")
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

   useEffect(() => {
     const token = localStorage.getItem("token");
     if (token) {
       setLogin(false)
     }
   }, []);
  return (
    <nav className="bg-blue-500 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/user" className="text-white font-bold text-lg">
          BankDocs
        </Link>
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
        <ul
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } flex-col lg:flex-row lg:space-x-6 space-y-4 lg:space-y-0 lg:flex absolute lg:static top-16 left-0 w-full lg:w-auto bg-blue-500 lg:bg-transparent p-4 lg:p-0 z-20`}
        >
          <li 
            onClick={()=>{setIsMenuOpen(false)}}
          >
            
            <Link href="/user"  className="text-white font-semibold hover:text-gray-200">
              Accueil
            </Link>
          </li>
          <li
           onClick={()=>{setIsMenuOpen(false)}}
          >
            <Link href="/about" className="text-white font-semibold hover:text-gray-200">
              À Propos
            </Link>
          </li>
          <li
            onClick={()=>{setIsMenuOpen(false)}}
          >
            <Link href="/contact" className="text-white font-semibold hover:text-gray-200">
              Contact
            </Link>
          </li>
          <li
            onClick={()=>{setIsMenuOpen(false)}}
          >
            {login ? <Link
              onClick={()=>{setIsMenuOpen(false)}}
              href="/login"
              className="inline-block bg-green-500 text-white font-semibold py-1 px-2 rounded-lg shadow-md hover:bg-green-600 transition-colors"
            >
              Se Connecter
            </Link> : <div
              className="inline-block cursor-pointer bg-red-400 text-white font-semibold py-1 px-2 rounded-lg shadow-md hover:bg-red-500 transition-colors"
                onClick={() => { handleLogout(); setIsMenuOpen(false)}}
            >
                Se deconnecter
            </div>
            }
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;