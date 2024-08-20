// components/PdfCard.tsx

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";


interface PdfCardProps {
  title: string;
  description: string;
  downloadLink: string;
  fileSize: string;
  id: string;
}

const PdfCard: React.FC<PdfCardProps> = ({
  title,
  description,
  downloadLink,
  fileSize,
  id
}) => {
    const router = useRouter();
  return (
    <div
      
      onClick={() => { if (localStorage.getItem("token")){ router.push(`/user/${id}`)} } }
      className="bg-white shadow-xl rounded-lg p-5 max-w-sm transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl  hover:bg-opacity-30 border border-gray-300 hover:border-blue-500">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
        <Image src="/pdf-icon.svg" alt="PDF Icon" width={32} height={32} />
      </div>
      <p className="text-gray-600 mt-3">{description}</p>
      <div className="flex justify-between items-center mt-5">
        <span className="text-gray-500 text-sm">Taille du fichier: <span className="font-bold">{fileSize}</span>   </span>
        <button
        onClick={() => { if (localStorage.getItem("token")){ router.push(`/user/${id}`)}else{toast.error("vous devez être connecter pour consulter le Document");} } }
          rel="noopener noreferrer"
          className="bg-blue-400 text-white z-10 py-1 px-4 rounded-lg transition-colors duration-300 hover:bg-blue-500 hover:shadow-md hover:underline"
        >
          Details
        </button>
      </div>
    </div>
  );
};

export default PdfCard;