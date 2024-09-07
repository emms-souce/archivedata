"use client";

import DragAndDrop from "@/components/dragAndDrop";
import React from "react";
import { FaFileUpload } from "react-icons/fa";

const Page = () => {
  return (
    <div className="py-12 container mx-auto w-full h-full flex flex-col items-center bg-gray-50">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl text-gray-800 font-bold mb-2">
          Ajouter un Nouveau Document
        </h1>
        <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
      </div>
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center justify-center mb-6">
          <FaFileUpload className="text-5xl text-blue-500 " />
          <p className="text-lg text-gray-600">
            Cet espace vous permet d'ajouter un document.
            <br />
            L'ajout se fera automatiquement.
          </p>
        </div>
        <div className="flex justify-center">
          <DragAndDrop />
        </div>
      </div>
    </div>
  );
};

export default Page;
