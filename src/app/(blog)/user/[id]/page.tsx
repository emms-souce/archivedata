"use client";

import { useParams, useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import React from "react";

interface Document {
  id: number;
  title: string;
  description: string;
  date: string;
}

const documentData: Document[] = [
  {
    id: 1,
    title: "Document 1",
    description: "Description complète du Document 1",
    date: "2024-01-01",
  },
  {
    id: 2,
    title: "Document 2",
    description: "Description complète du Document 2",
    date: "2024-02-01",
  },
  {
    id: 3,
    title: "Document 3",
    description: "Description complète du Document 3",
    date: "2024-03-01",
  },
  // Ajoutez plus de documents ici si nécessaire
];

const DocumentDetail: React.FC = () => {
  const router = useRouter();
  const { id } = useParams()

  const document = documentData.find(
    (doc) => doc.id === parseInt(id as string)
  );

  if (!document) {
    return (
      <div className="container mx-auto p-5 ">
        <h2 className="text-2xl font-bold text-center">Document introuvable</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto flex flex-col items-center p-5">
          <h1 className="text-3xl font-bold mb-4">{document.title}</h1>
          <div>Resumer du document</div>
      <p className="text-gray-700 mb-4">{document.description}</p>
      <p className="text-gray-500">Date: {document.date}</p>
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
