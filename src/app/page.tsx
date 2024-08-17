"use client";

import { redirect, useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';


const page = () => {
    const router = useRouter();
    useEffect(() => {
        const timer = setTimeout(() => {
            router.push("/user");
        }, 1000);

        return () => clearTimeout(timer);
        
    }, [redirect]);
    
    
    return (
        <div className='w-screen min-h-screen flex justify-center items-center'>
            <div className=' zoom-animation mx-auto text-5xl font-bold text-blue-500'> Se documenter c'est la base </div>
        </div>
    );
};

export default page;