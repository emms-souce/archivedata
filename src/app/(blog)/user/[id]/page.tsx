"use client";

import { API_BASE_URL } from "@/components/config/apiRoutes";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";


interface FileItem {
  uuid: string;
  public_id: string;
  file_name: string;
  summary: string | null;
  width: number;
  height: number;
  size: number;
  cloudinary_file_name: string;
  url: string;
  format: string | null;
}

const DocumentDetail: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
  const [document, setDocument] = useState<FileItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [summaryVisible, setSummaryVisible] = useState<boolean>(false);
  const [loadingSummary, setLoadingSummary] = useState<boolean>(false);

  const apiroute = API_BASE_URL;

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await fetch(`${apiroute}/storages/get/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you have a token stored
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching document: ${response.statusText}`);
        }

        const data: FileItem = await response.json();
        setDocument(data);
      } catch (error) {
        console.error("Failed to fetch document:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDocument();
    }
  }, [id]);

  const toggleSummary = () => {
    setLoadingSummary(true);
    setTimeout(() => {
      setSummaryVisible(!summaryVisible);
      setLoadingSummary(false);
    }, 3000); // Simulate loading time
  };

  if (loading) {
    return (
      <div className="container mx-auto p-5 text-center">
        <h2 className="text-2xl font-bold"> Chargement du document...</h2>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="container mx-auto p-5 text-center">
        <h2 className="text-2xl font-bold">Document introuvable</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto flex flex-col items-center p-5">
      <div className="w-full text-gray-600 mt-5 font-bold py-4 text-2xl text-center">
       Details du  document
      </div>{" "}
      <h1 className="text-3xl font-bold mb-4">{document.file_name}</h1>
      {/* <img
        src={document.url}
        alt={document.file_name}
        className="max-w-full h-auto mb-4"
        width={document.width}
        height={document.height}
      /> */}
      <div className="mt-4">
        <button
          onClick={toggleSummary}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
        >
          {summaryVisible ? "Masquer le resumer" : "Génerer le résumé"}
        </button>
      </div>
      {loadingSummary && !summaryVisible ? (
        <div className="text-gray-500 flex mt-4 items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 mr-4"></div>{" "}
          Génération du résumé...
        </div>
      ) : (
        summaryVisible && (
          <p className="text-gray-700 mt-4 px-5 text-justify">
            {document.summary || "Aucun résumé disponible"}
          </p>
        )
      )}
      {/* <p className="text-gray-500 mt-4">Date ajoutée: {document.date_added}</p> */}
      <p className="text-gray-500 mt-10">Taille: <span className="font-bold"> {document.size} Kb</span> </p>
      <p className="text-gray-500 mt-2">
        Format: <span className="font-bold">{document.format || "Inconnu"}</span>
      </p>
      <div className="mt- flex flex-col space-y-4">
        <a
          href={document.url}
          download={document.file_name}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors"
        >
          Consulter le Document
        </a>
      </div>
      <div
        onClick={() => router.push("/user")}
        className="w-full mt-20 items-center flex cursor-pointer"
      >
        <FaArrowCircleLeft className=" text-blue-500 mr-2" />
        <button className=" text-blue-600  rounded hover:text-blue-700 hover:underline transition-colors">
          Retour à la liste des documents
        </button>
      </div>
    </div>
  );
};

export default DocumentDetail;