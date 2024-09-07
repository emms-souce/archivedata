// components/PdfCard.tsx

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

interface PdfCardProps {
  title: string;
  description: string;
  fileSize: string;
  id: string;
  format: string;
}

const PdfCard: React.FC<PdfCardProps> = ({ format, title, fileSize, id }) => {
  const router = useRouter();

  function truncateString(input: string): string {
    if (input.length <= 20) {
      return input;
    }
    return input.slice(0, 20) + "...";
  }

  return (
    <div
     onClick={(e) => {
            e.stopPropagation();
            if (localStorage.getItem("token")) {
              router.push(`/user/${id}`);
            } else {
              toast.error("Vous devez être connecté pour consulter le document");
            }
          }}
      className="bg-white shadow-md rounded-lg p-6 max-w-sm transform transition-all duration-300 hover:scale-102 hover:shadow-lg hover:border-blue-500 border border-gray-200"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {truncateString(title)}
        </h2>
        <Image src="/docs.png" alt="PDF Icon" width={40} height={40} className="opacity-80" />
      </div>

      <div className="text-gray-600 text-sm mb-4">
        Type de fichier: <span className="font-medium text-gray-800">{format}</span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-gray-600 text-sm">
          Taille: <span className="font-medium text-gray-800">{fileSize}</span>
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (localStorage.getItem("token")) {
              router.push(`/user/${id}`);
            } else {
              toast.error("Vous devez être connecté pour consulter le document");
            }
          }}
          className="bg-blue-500 text-white py-2 px-4 rounded-md transition-colors duration-300 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Détails
        </button>
      </div>
    </div>
  );
};

export default PdfCard;
