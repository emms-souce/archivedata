"use client";

import { API_BASE_URL } from "@/components/config/apiRoutes";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";


interface Document {
  uuid: string;
  public_id: string;
  file_name: string;
  summary: string;
  width: number;
  height: number;
  size: number;
  cloudinary_file_name: string;
  url: string;
  format: string;
}

const DocumentsPage: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
    const apiroute = API_BASE_URL;


  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch(
          `${apiroute}/storages/documents?page=1&per_page=100`
        );
        if (response.ok) {
          const data = await response.json();
          setDocuments(data.data || []);
          setFilteredDocuments(data.data || []);
        } else {
          console.error(
            "Erreur lors de la récupération des documents:",
            response.status
          );
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des documents:", error);
      }
    };

    fetchDocuments();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = documents.filter(
      (doc) =>
        doc.file_name.toLowerCase().includes(query) ||
        doc.format.toLowerCase().includes(query)
    );

    setFilteredDocuments(filtered);
    setCurrentPage(1); // Reset to first page when search query changes
  };

  const handleDelete = async (public_id: string) => {
     const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${apiroute}/storages?file_public_id=${public_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        toast.success("Document supprimé avec succès");
        setDocuments((prev) =>
          prev.filter((doc) => doc.public_id !== public_id)
        );
        setFilteredDocuments((prev) =>
          prev.filter((doc) => doc.public_id !== public_id)
        );
      } else {
        toast.error("Erreur lors de la suppression du document");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du document:", error);
      toast.error("Erreur lors de la suppression du document");
    }
  };

  // Calculate documents to display based on the current page
  const indexOfLastDocument = currentPage * itemsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - itemsPerPage;
  const currentDocuments = filteredDocuments.slice(
    indexOfFirstDocument,
    indexOfLastDocument
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);

  return (
    <div className="container mx-auto p-5">
      <ToastContainer/>
      <div className="text-2xl font-bold text-gray-700 mb-4">Liste des Documents</div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 shadow-md"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-lg">
          <thead>
            <tr>
              <th className="py-3 px-6 text-left text-gray-600 font-bold uppercase border-b">
                Nom du fichier
              </th>
              <th className="py-3 px-6 text-left text-gray-600 font-bold uppercase border-b">
                Format
              </th>
              <th className="py-3 px-6 text-left text-gray-600 font-bold uppercase border-b">
                Taille (KB)
              </th>
              <th className="py-3 px-6 text-center text-gray-600 font-bold uppercase border-b">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentDocuments.map((doc) => (
              <tr key={doc.uuid} className="hover:bg-gray-100">
                <td className="py-4 px-6 border-b text-gray-800">
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {doc.file_name}
                  </a>
                </td>
                <td className="py-4 px-6 border-b text-gray-800">
                  {doc.format}
                </td>
                <td className="py-4 px-6 border-b text-gray-800">
                  {(doc.size / 1024).toFixed(2)}
                </td>
                <td className="py-4 px-6 border-b text-center">
                  <button
                    onClick={() => handleDelete(doc.public_id)}
                    className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600 transition-colors"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
            {currentDocuments.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="py-4 px-6 border-b text-center text-gray-500"
                >
                  Aucun document trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`py-2 px-4 rounded ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Précédent
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`py-2 px-4 rounded ${
                currentPage === page
                  ? "bg-blue-800 text-white"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`py-2 px-4 rounded ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  );
};

export default DocumentsPage;