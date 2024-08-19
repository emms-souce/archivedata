"use client";

import DragAndDrop from "@/components/dragAndDrop";
import React from "react";

const Page = () => {
  return (
    <div className="py-10 container mx-auto w-full h-full flex flex-col  ">
      <div className='className="inline-block  text-2xl text-gray-700 font-bold py-2 px-6 rounded-lg  transition-colors"'>
        Ajouter un Nouveau document
      </div>
      <div className="text-lg text-center text-blue-500 font-semibold ">
        NB: Le resumer seront générés automatiquement via une IA
      </div>
      <div className="mt-5 flex justify-center ">
        <DragAndDrop />
      </div>
    </div>
  );
};

export default Page;
