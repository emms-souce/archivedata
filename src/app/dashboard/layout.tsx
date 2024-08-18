"use client";

import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
const router = useRouter();
     useEffect(() => {
       const token = localStorage.getItem("token");
        
       if (!token) {
         router.push("/login");
       }
     }, []);
  return (
         <div className="flex w-full bg-white shadow-lg max-w-[1800px] mx-auto">
          <Sidebar/>
          <div className="w-full">
            <Navbar/>
              <div> {children}</div>
          </div>
         </div>

  );
}