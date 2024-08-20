"use client";

import SearchBar from "./component/searchBar";
import PdfCard from "@/components/cardItem";
import React, { useEffect, useState } from "react";

type fileItem = {
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
};

async function fetchFileItems(): Promise<fileItem[]> {
  try {
    const response = await fetch(
      "https://archive-doc-app.onrender.com/api/v1/storages/documents?page=1&per_page=30&order=desc&order_filed=date_added",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // If a token is required
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();

    const fileItems: fileItem[] = data.data.map((item: any) => ({
      uuid: item.uuid,
      public_id: item.public_id,
      file_name: item.file_name,
      summary: item.summary,
      width: item.width,
      height: item.height,
      size: item.size,
      cloudinary_file_name: item.cloudinary_file_name,
      url: item.url,
      format: item.format,
    }));

    return fileItems;
  } catch (error) {
    console.error("Failed to fetch file items:", error);
    return [];
  }
}

const ITEMS_PER_PAGE = 12; // Pagination set to 12 items per page

const HomePage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [documents, setDocuments] = useState<fileItem[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<fileItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDocuments = async () => {
      setLoading(true);
      const apiDocuments = await fetchFileItems();
      setDocuments(apiDocuments);
      setFilteredDocuments(apiDocuments); // Initially, all documents are shown
      setLoading(false);
    };

    loadDocuments();
  }, []);

  const handleSearch = (query: string) => {
    const filtered = documents.filter((doc) =>
      doc.file_name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredDocuments(filtered);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const selectedDocuments = filteredDocuments.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredDocuments.length / ITEMS_PER_PAGE);

  return (
    <div className="w-full bg-white">
      <div className="w-full text-gray-600 mt-5 font-bold py-4 text-2xl text-center">
        Quel Document Recherchez-vous? Consultez Notre Banque de Documents!
      </div>

      <div className="container mx-auto px-4">
        <SearchBar onSearch={handleSearch} />

        {loading ? (
          <div className="text-center text-gray-500 mt-6">
            Chargement des documents...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {selectedDocuments.map((doc) => (
              <PdfCard
                id={doc.public_id}
                key={doc.uuid}
                title={doc.file_name}
                description={doc.summary || "No description available"}
                downloadLink={doc.url}
                fileSize={`${(doc.size / 1024).toFixed(2)} Kb`}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && (
          <div className="flex justify-end mt-6">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 border rounded-lg ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-blue-500 hover:bg-blue-100"
              }`}
            >
              Précédent
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-1 border rounded-lg mx-1 ${
                  currentPage === i + 1
                    ? "bg-blue-500 text-white"
                    : "text-blue-500 hover:bg-blue-100"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 border rounded-lg ${
                currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-blue-500 hover:bg-blue-100"
              }`}
            >
              Suivant
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
