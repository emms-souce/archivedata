"use client";

import React, { useState } from "react";

interface Document {
  id: number;
  title: string;
  description: string;
  date: string;
}

const initialDocuments: Document[] = [
  {
    id: 1,
    title: "Document 1",
    description: "Description of Document 1",
    date: "2024-01-01",
  },
  {
    id: 2,
    title: "Document 2",
    description: "Description of Document 2",
    date: "2024-02-01",
  },
  {
    id: 3,
    title: "Document 3",
    description: "Description of Document 3",
    date: "2024-03-01",
  },
  // Ajoutez plus de documents ici
];

const DocumentTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);

  const handleDelete = (id: number) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
  };

  const filteredDocuments = documents.filter((doc) =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-5">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Rechercher des documents..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-lg">
          <thead>
            <tr>
              <th className="py-3 px-6 text-left text-gray-600 font-bold uppercase border-b">
                Titre
              </th>
              <th className="py-3 px-6 text-left text-gray-600 font-bold uppercase border-b">
                Description
              </th>
              <th className="py-3 px-6 text-left text-gray-600 font-bold uppercase border-b">
                Date
              </th>
              <th className="py-3 px-6 text-left text-gray-600 font-bold uppercase border-b">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredDocuments.length > 0 ? (
              filteredDocuments.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-100">
                  <td className="py-4 px-6 border-b text-gray-800">
                    {doc.title}
                  </td>
                  <td className="py-4 px-6 border-b text-gray-800">
                    {doc.description}
                  </td>
                  <td className="py-4 px-6 border-b text-gray-800">
                    {doc.date}
                  </td>
                  <td className="py-4 px-6 border-b text-gray-800">
                    <button
                      onClick={() => handleDelete(doc.id)}
                      className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600 transition-colors"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-4 px-6 text-center text-gray-500">
                  Aucun document trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DocumentTable;
