"use client";

import { API_BASE_URL } from "@/components/config/apiRoutes";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaArrowCircleLeft, FaFileAlt, FaDownload } from "react-icons/fa";

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
  const { id } = useParams() as { id: string };
  const [document, setDocument] = useState<FileItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [summaryVisible, setSummaryVisible] = useState<boolean>(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [loadingSummary, setLoadingSummary] = useState<boolean>(false);

  const apiroute = API_BASE_URL;

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await fetch(`${apiroute}/storages/get/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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
  }, [id, apiroute]);

  const fetchSummary = async () => {
    if (!document) return;
    setLoadingSummary(true);
    try {
      const response = await fetch(`${apiroute}/storages/resume/${document.uuid}?file_public_id=${document.public_id}`, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching summary: ${response.statusText}`);
      }

      const data = await response.json(); // Changé de response.text() à response.json()
      console.log("Résumé reçu:", data); // Ajout d'un log pour vérifier la réponse

      if (data) {
        setSummary(data);
        setSummaryVisible(true);
      } else {
        setSummary("Aucun résumé disponible pour ce document.");
        setSummaryVisible(true);
      }
    } catch (error) {
      console.error('Failed to fetch summary:', error);
      setSummary('Erreur lors de la récupération du résumé.');
      setSummaryVisible(true);
    } finally {
      setLoadingSummary(false);
    }
  };

  const toggleSummary = () => {
    if (summaryVisible) {
      setSummaryVisible(false);
    } else {
      fetchSummary();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-700">Chargement du document...</h2>
        </div>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <h2 className="text-2xl font-bold text-red-600">Document introuvable</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-800">{document.file_name}</h1>
            <FaFileAlt className="text-4xl text-blue-500" />
          </div>
          
          <div className="mb-6">
            <button
              onClick={toggleSummary}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors flex items-center justify-center"
            >
              {summaryVisible ? "Masquer le résumé" : "Générer le résumé"}
            </button>
          </div>

          {loadingSummary ? (
            <div className="text-gray-500 flex items-center justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-500 mr-3"></div>
              Génération du résumé...
            </div>
          ) : (
            summaryVisible && summary && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-700">Résumé du document :</h3>
                <p className="text-gray-600 text-justify">{summary}</p>
              </div>
            )
          )}

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-600">Taille: <span className="font-semibold text-gray-800">{document.size} Kb</span></p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-600">Format: <span className="font-semibold text-gray-800">{document.format || "Inconnu"}</span></p>
            </div>
          </div>

          <div className="flex justify-center">
            <a
              href={document.url}
              download={document.file_name}
              className="bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition-colors flex items-center"
            >
              <FaDownload className="mr-2" />
              Télécharger le Document
            </a>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4">
          <div
            onClick={() => router.push("/user")}
            className="flex items-center cursor-pointer text-blue-500 hover:text-blue-600 transition-colors"
          >
            <FaArrowCircleLeft className="mr-2" />
            <span className="font-medium">Retour à la liste des documents</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentDetail;