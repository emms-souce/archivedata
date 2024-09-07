// components/Navbar.tsx

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    router.push("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <nav className="bg-blue-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/user" className="text-white font-bold text-xl">
          BankDocs
        </Link>
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded-md"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
        <ul
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } flex-col lg:flex-row lg:space-x-6 space-y-4 lg:space-y-0 lg:flex absolute lg:static top-16 left-0 w-full lg:w-auto bg-blue-600 lg:bg-transparent p-4 lg:p-0 z-20 transition-all duration-300 ease-in-out`}
        >
          {["Accueil", "À Propos", "Contact"].map((item) => (
            <li key={item} onClick={() => setIsMenuOpen(false)}>
              <Link
                href={item === "Accueil" ? "/user" : `/${item.toLowerCase().replace(" ", "-").replace("à", "a")}`}
                className="text-white font-semibold hover:text-blue-200 transition-colors duration-200"
              >
                {item}
              </Link>
            </li>
          ))}
          <li onClick={() => setIsMenuOpen(false)}>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                Se déconnecter
              </button>
            ) : (
              <Link
                href="/login"
                className="bg-green-500 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-green-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              >
                Se Connecter
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;