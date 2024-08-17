
"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
const router = useRouter()
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/user")
     }
   },[])
  return (
    <html lang="en">
      <ToastContainer/>
      <body>{children}</body>
    </html>
  );
}
