"use client";

import Head from 'next/head';
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';


const page = () => {
    const router = useRouter();
    useEffect(() => {
        const timer = setTimeout(() => {
            router.push("/user");
        }, 1000);

        return () => clearTimeout(timer);
        
    }, [redirect]);
    
    
    return (
        <> <Head>
        <title>Nouveau Nom de l'Application</title>
      </Head>
             <div className='w-full min-h-screen flex justify-center items-center'>
            <div className=' text-lg  zoom-animation mx-auto md:text-2xl lg:text-5xl font-bold text-blue-500'> Se documenter c'est la base </div>
        </div>
        </>
       
    );
};

export default page;