"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import {
  FaBars,
  FaTimes,
  FaTachometerAlt,
  FaFileAlt,
  FaFileUpload,
  FaUsers,
  FaUserCircle,
} from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: <FaTachometerAlt /> },
    { name: "Ajouter un document", href: "/dashboard/add-document", icon: <FaFileUpload /> },
    { name: "Documents", href: "/dashboard/documents", icon: <FaFileAlt /> },
    { name: "Utilisateurs", href: "/dashboard/users", icon: <FaUsers /> },
  ];

  // const isActive = (href: string) => router.pathname === href;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } fixed top-0 left-0 h-full w-64 bg-blue-700 text-white flex flex-col justify-between transition-transform duration-300 ease-in-out z-50 md:translate-x-0 md:static md:h-screen`}
      >
        <div className="flex flex-col items-center mt-8">
          <Image
            alt="logo"
            src="/homelogo.jpg"
            width={100}
            height={100}
            className="rounded-full mb-6 border-4 border-white shadow-lg"
          />
          <nav className="w-full">
            {menuItems.map((item) => (
              <Link href={item.href} key={item.name}>
                <div
                  onClick={() => setIsOpen(false)}
                  className={`py-3 px-6 mb-2 flex items-center transition-colors duration-200 ${
                   
                       "text-blue-100 bg-blue-800 hover:bg-blue-600"
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.name}</span>
                </div>
              </Link>
            ))}
          </nav>
        </div>

        <Link
          href="/dashboard/profile"
          className="mb-8 mx-6"
          onClick={() => setIsOpen(false)}
        >
          <div className="py-3 px-6 flex items-center bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors duration-200">
            <FaUserCircle className="mr-3" />
            <span>Mon profil</span>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Sidebar;
