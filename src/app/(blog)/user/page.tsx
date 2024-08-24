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
    <div className="w-full bg-white">
      <div className="w-full text-gray-600 mt-5 font-bold py-4 text-2xl text-center">
        Quel Document Recherchez-vous? Consultez Notre Banque de Documents!
      </div>

      <div className="container mx-auto px-4">
        <SearchBar onSearch={handleSearch} />

        {/* Filters */}
        <div className="flex justify-between mb-4">
          <div>
            <div className="font-bold">Filtrer par type</div>
            <select
              onChange={(e) => handleFilter(e.target.value, "")}
              className="p-2 border border-gray-300 rounded-lg"
            >
              <option value="">Tous les types</option>
              <option value="pdf">PDF</option>
              <option value="docx">DOCX</option>
              <option value="jpg">JPG</option>
              {/* Add more options based on your file types */}
            </select>
          </div>

          <div>
            <div className="font-bold"> Filtrer par date d'ajout</div>
            <input
              type="date"
              onChange={(e) => handleFilter("", e.target.value)}
              className="p-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

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
                fileSize={`${(doc.size / 1024).toFixed(2)} Kb`}
                format={doc.format}
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