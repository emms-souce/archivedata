"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
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
    {
      name: "Ajouter un document",
      href: "/dashboard/add-document",
      icon: <FaFileUpload />,
    },
    { name: "Documents", href: "/dashboard/documents", icon: <FaFileAlt /> },
    { name: "Utilisateurs", href: "/dashboard/users", icon: <FaUsers /> },
  ];

  const isActive = (href: string) => false

  return (
    <div className="relative">
      {/* Overlay when the sidebar is open on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Toggle button for small screens */}
      <button
        className="md:hidden fixed top-2 left-2 z-[30] p-2 bg-blue-300 text-white rounded-full shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24}  />}
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "translate-x-0 py-20" : "-translate-x-full h-screen"
        } md:translate-x-0 fixed top-0 left-0 h-full w-64 bg-blue-200 flex flex-col justify-between items-center p-3 z-50 transform transition-transform duration-300 ease-in-out shadow-lg md:relative md:shadow-none`}
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
                className={`mt-2 py-2 px-2 w-full flex items-center rounded-lg text-lg font-semibold transition-colors ${
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
          <div className="mt-2 py-2 px-2 w-full flex items-center rounded-lg text-lg font-semibold bg-blue-600 text-white hover:bg-blue-800 transition-colors">
            <FaUserCircle className="mr-2" />
            <span>Mon profile</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
