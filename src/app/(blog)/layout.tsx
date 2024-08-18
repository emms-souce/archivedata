"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Navbar from "./user/component/navbar";
import Footer from "./user/component/footer";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = localStorage.getItem("token");
  const router = useRouter();
  useEffect(() => {
    if (!token) {
      // router.push("/login");
    }
  }, []);
  return (
    <div className=" flex flex-col min-h-screen justify-between bg-gray-50 text-black">
      <div className="w-full">
        <Navbar />
      
        {children}
    
      </div>
     
     <Footer/>

    </div>
  );
}
