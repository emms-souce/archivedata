"use client";

import SearchBar from "./component/searchBar";
import PdfCard from "@/components/cardItem";
import { API_BASE_URL } from "@/components/config/apiRoutes";
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
  format: string;
  date_added: string;
};

const apiroute = API_BASE_URL;

async function fetchFileItems(): Promise<fileItem[]> {
  try {
    const response = await fetch(
      `${apiroute}/storages/documents?page=1&per_page=30&order=desc&order_filed=date_added`,
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
      date_added: item.date_added,
    }));

    return fileItems;
  } catch (error) {
    console.error("Failed to fetch file items:", error);
    return [];
  }
}

const ITEMS_PER_PAGE = 12;

const HomePage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [documents, setDocuments] = useState<fileItem[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<fileItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Constant to store all the documents
  const [allDocuments, setAllDocuments] = useState<fileItem[]>([]);

  useEffect(() => {
    const loadDocuments = async () => {
      setLoading(true);
      const apiDocuments = await fetchFileItems();
      setDocuments(apiDocuments);
      setAllDocuments(apiDocuments); // Store all documents in a constant
      setFilteredDocuments(apiDocuments); // Initially, all documents are shown
      setLoading(false);
    };

    loadDocuments();
  }, []);

  const handleSearch = (query: string) => {
    const filtered = allDocuments.filter((doc) =>
      doc.file_name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredDocuments(filtered);
    setCurrentPage(1);
  };

  const handleFilter = (type: string, date: string) => {
    let filtered = allDocuments;

    if (type) {
      filtered = filtered.filter((doc) => doc.format === type);
    }

    if (date) {
      filtered = filtered.filter((doc) => doc.date_added.startsWith(date));
    }

    setFilteredDocuments(filtered);
    setCurrentPage(1);
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
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Consultez Notre Banque de Documents
        </h1>

        <SearchBar onSearch={handleSearch} />

        <div className="flex flex-col md:flex-row justify-between mb-8 mt-6">
          <div className="mb-4 md:mb-0">
            <label
              htmlFor="type-filter"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Filtrer par type
            </label>
            <select
              id="type-filter"
              onChange={(e) => handleFilter(e.target.value, "")}
              className="w-full md:w-auto p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Tous les types</option>
              <option value="pdf">PDF</option>
              <option value="docx">DOCX</option>
              <option value="jpg">JPG</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="date-filter"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Filtrer par date d'ajout
            </label>
            <input
              id="date-filter"
              type="date"
              onChange={(e) => handleFilter("", e.target.value)}
              className="w-full md:w-auto p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {selectedDocuments.map((doc) => (
              <PdfCard
                key={doc.uuid}
                id={doc.public_id}
                title={doc.file_name}
                description={doc.summary || "No description available"}
                fileSize={`${(doc.size / 1024).toFixed(2)} Kb`}
                format={doc.format}
              />
            ))}
          </div>
        )}

        {!loading && (
          <div className="flex justify-center mt-8">
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                  currentPage === 1
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                Précédent
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                    currentPage === i + 1
                      ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                  currentPage === totalPages
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                Suivant
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
