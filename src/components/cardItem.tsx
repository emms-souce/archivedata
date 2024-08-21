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
    if (input.length <= 15) {
      return input;
    }
    return input.slice(0, 15) + "...";
  }
  return (
    <div
      onClick={() => {
        if (localStorage.getItem("token")) {
          router.push(`/user/${id}`);
        }
      }}
      className="bg-gray-100 shadow-xl rounded-lg p-5 max-w-sm transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl  hover:bg-opacity-30 border border-gray-300 hover:border-blue-500"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-800">
          {truncateString(title)}
        </h2>
        <Image src="/docs.png" alt="PDF Icon" width={32} height={32} />
      </div>

      <div className="text-gray-500 text-sm mt-3">
        Typedu fichier: <span className="font-bold">{format}</span>{" "}
      </div>

      <div className="flex justify-between items-center mt-5">
        <span className="text-gray-500 text-sm">
          Taille du fichier: <span className="font-bold">{fileSize}</span>{" "}
        </span>
        <button
          onClick={() => {
            if (localStorage.getItem("token")) {
              router.push(`/user/${id}`);
            } else {
              toast.error(
                "vous devez être connecter pour consulter le Document"
              );
            }
          }}
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
