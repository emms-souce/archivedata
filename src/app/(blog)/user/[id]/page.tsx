"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Document {
  id: string;
  title: string;
  description: string;
  date: string;
}

const DocumentDetail: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
  const [document, setDocument] = useState<Document | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [summaryVisible, setSummaryVisible] = useState<boolean>(false);
  const [loadingSummary, setLoadingSummary] = useState<boolean>(false);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await fetch(
          `https://archive-doc-app.onrender.com/api/v1/storages/get/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you have a token stored
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error fetching document: ${response.statusText}`);
        }

        const data = await response.json();
        setDocument({
          id: data.uuid,
          title: data.file_name,
          description: data.summary || "No description available",
          date: data.date_added,
        });
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
    }, 500); // Simulate loading time
  };

  if (loading) {
    return (
      <div className="container mx-auto p-5 text-center">
        <h2 className="text-2xl font-bold">Chargement du document...</h2>
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
      <h1 className="text-3xl font-bold mb-4">{document.title}</h1>
      <div className="mt-4">
        <button
          onClick={toggleSummary}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
        >
          {summaryVisible ? "Masquer le résumé" : "Afficher le résumé"}
        </button>
      </div>
      {loadingSummary ? (
        <div className="text-gray-500 mt-4">Chargement du résumé...</div>
      ) : (
        summaryVisible && (
          <p className="text-gray-700 mt-4">{document.description}</p>
        )
      )}
      <p className="text-gray-500 mt-4">Date: {document.date}</p>
      <div className="mt-6">
        <button
          onClick={() => router.push("/user")}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
        >
          Retour à la liste des documents
        </button>
      </div>
    </div>
  );
};

export default DocumentDetail;
