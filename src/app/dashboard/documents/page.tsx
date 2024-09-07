"use client";

import { API_BASE_URL } from "@/components/config/apiRoutes";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSearch, FaTrash, FaFileAlt } from "react-icons/fa";

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
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 8;
  const apiroute = API_BASE_URL;

  useEffect(() => {
    const fetchDocuments = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${apiroute}/storages/documents?page=1&per_page=100`
        );
        if (response.ok) {
          const data = await response.json()
          setDocuments(data.data || []);
          setFilteredDocuments(data.data || []);
        } else {
          console.error(
            "Erreur lors de la récupération des documents:",
            response.status
          );
          toast.error("Erreur lors de la récupération des documents");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des documents:", error);
        toast.error("Erreur lors de la récupération des documents");
      } finally {
        setIsLoading(false);
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
    setCurrentPage(1);
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

  const indexOfLastDocument = currentPage * itemsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - itemsPerPage;
  const currentDocuments = filteredDocuments.slice(
    indexOfFirstDocument,
    indexOfLastDocument
  );

  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);

  return (
    <div className="container mx-auto p-5">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Liste des Documents</h1>
      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Rechercher un document..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-gray-700"
        />
        <FaSearch className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nom du fichier
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Format
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Taille (KB)
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 whitespace-nowrap">
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                  </div>
                </td>
              </tr>
            ) : (
              currentDocuments.map((doc) => (
                <tr key={doc.uuid} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FaFileAlt className="flex-shrink-0 h-5 w-5 text-gray-400 mr-3" />
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-blue-600 hover:text-blue-900"
                      >
                        {doc.file_name}
                      </a>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {doc.format}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {(doc.size / 1024).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <button
                      onClick={() => handleDelete(doc.public_id)}
                      className="text-red-600 hover:text-red-900 transition duration-150 ease-in-out"
                    >
                      <FaTrash className="inline-block mr-1" /> Supprimer
                    </button>
                  </td>
                </tr>
              ))
            )}
            {!isLoading && currentDocuments.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  Aucun document trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              Précédent
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                  currentPage === page
                    ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              Suivant
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default DocumentsPage;