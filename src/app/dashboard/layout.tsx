"use client";

import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
const router = useRouter();
     useEffect(() => {
       const token = localStorage.getItem("token");
       const userType = localStorage.getItem("userType");
        
       if (userType !== "Administrateur") {
         router.push("/login");
       }
     }, []);
  return (
    <div className="flex w-full bg-white shadow-lg max-w-[1800px] mx-auto">
      <ToastContainer/>
          <Sidebar/>
          <div className="w-full">
            <Navbar/>
              <div className="mt-14"> {children}</div>
          </div>
         </div>

  );
}