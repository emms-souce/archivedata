"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";


const LogoutModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter()

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login")
    setIsModalOpen(false);
  
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsModalOpen(true)}
        className=""
      >
        <div className='rounded-full bg-gray-500 p-1'><FaUser className="text-white"/></div>
      </button>

      {isModalOpen && (
        <div
          className="fixed inset-0 flex  justify-end p-10 bg-black bg-opacity-50 z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg relative w-80 h-20"
            onClick={(e) => e.stopPropagation()} // Empêche la fermeture en cliquant sur la modal
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
            >
              ✕
            </button>

           

            <div className="flex justify-center">
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors"
              >
                Se déconnecter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoutModal;