"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  FaBars,
  FaTimes,
  FaTachometerAlt,
  FaFileAlt,
  FaFileUpload,
  FaUsers,
  FaUserCircle,
} from "react-icons/fa";

// Importing icons

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: <FaTachometerAlt /> },
    {
      name: "Ajouter un document",
      href: "/dashboard/add-document",
      icon: <FaFileUpload />,
    },
    { name: "Documents", href: "/dashboard/documents", icon: <FaFileAlt /> },
    { name: "Utilisateurs", href: "/dashboard/users", icon: <FaUsers /> },
  ];

  const isActive = (href: string) => "dashboard" === href;

  return (
    <div>
      {/* Bouton de toggle visible sur les petits écrans */}
      <button
        className="md:hidden absolute left-0 p-2 bg-blue-600 py-4 text-white -mr-10"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <FaTimes className="z-5" size={20} />
        ) : (
          <FaBars className="z-5" size={20} />
        )}{" "}
        {/* Icons for toggling */}
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "flex !pb-12 " : "hidden"
        } max-sm:fixed max-sm:top-12 md:flex z-[99] bg-blue-200 flex-col justify-between items-center h-screen px-4 py-5 min-w-[16rem] transition-all duration-300`}
      >
        <nav className="w-full flex flex-col items-center">
          <Image
            alt="logo"
            src="/homelogo.jpg"
            className="mb-8"
            width={100}
            height={100}
          />

          {menuItems.map((item) => (
            <Link href={item.href} key={item.name} className="w-full">
              <div
                onClick={() => setIsOpen(false)}
                className={`mt-2 py-2 px-2 w-full flex items-center  rounded-lg text-lg font-semibold transition-colors ${
                  isActive(item.href)
                    ? "bg-blue-800 text-white"
                    : "bg-blue-600 text-white hover:bg-blue-800"
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                <div>{item.name}</div>
              </div>
            </Link>
          ))}
        </nav>

        <Link
          href="/dashboard/profile"
          className="w-full"
          onClick={() => setIsOpen(false)}
        >
          <div className="mt-2 py-2 px-2 w-full flex items-center  rounded-lg text-lg font-semibold bg-blue-600 text-white hover:bg-blue-800 transition-colors">
            <FaUserCircle className="mr-2" />
            <span>Mon profile</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
