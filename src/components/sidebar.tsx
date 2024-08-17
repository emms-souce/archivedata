"use client";

import Image from "next/image";
import Link from "next/link";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";
import React from "react";


const Sidebar = () => {
 const router = useRouter();
  const menuItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Ajouter un document", href: "/dashboard/add-document" },
    { name: "Documents", href: "/dashboard/documents" },
    { name: "utilisateurs", href: "/dashboard/users" },
  ];

  const isActive = (href: string) => "dashboard" === href;

  return (
    <div className="hidden bg-gray-300 md:flex flex-col justify-between items-center h-screen  px-4 py-5 min-w-[16rem]">
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
              className={`mt-2 py-2 px-2 w-full flex items-center justify-center rounded-lg text-lg font-semibold transition-colors ${
                isActive(item.href)
                  ? "bg-blue-500 text-white"
                  : "bg-blue-400 text-white hover:bg-blue-300"
              }`}
            >
              <div>{item.name}</div>
            </div>
          </Link>
        ))}
      </nav>

      <Link href="/dashboard/profile" className="w-full">
        <div className="mt-2 py-2 px-2 w-full flex items-center justify-center rounded-lg text-lg font-semibold bg-blue-400 text-white hover:bg-blue-300 transition-colors">
          <span>Mon profile</span>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;