"use client"

import DragAndDrop from '@/components/dragAndDrop';
import React from 'react';

const page = () => {
    return (
        <div className='py-10 container mx-auto w-full h-full flex flex-col justify-center items-center'>
            <div className='className="inline-block bg-blue-500 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-colors"'>Ajouter un Nouveau document</div>
            <div className='text-lg text-center text-gray-700'>NB:le titre la description et le resumer seront générés automatiquement</div>
            <div className='mt-5 flex justify-center '>
                <DragAndDrop/>
            </div>
        </div>
    );
};

export default page;