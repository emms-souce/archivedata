"use client";

import SearchBar from "./component/searchBar";
import PdfCard from "@/components/cardItem";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";


const pdfDocuments = [
  {
    title: "Sample PDF 1",
    description: "Description for sample PDF 1.",
    downloadLink: "/path/to/sample1.pdf",
    fileSize: "1.2 MB",
  },
  {
    title: "Sample PDF 1",
    description: "Description for sample PDF 1.",
    downloadLink: "/path/to/sample1.pdf",
    fileSize: "1.2 MB",
  },
  {
    title: "Sample PDF 1",
    description: "Description for sample PDF 1.",
    downloadLink: "/path/to/sample1.pdf",
    fileSize: "1.2 MB",
  },
  {
    title: "Sample PDF 1",
    description: "Description for sample PDF 1.",
    downloadLink: "/path/to/sample1.pdf",
    fileSize: "1.2 MB",
  },
  {
    title: "Sample PDF 1",
    description: "Description for sample PDF 1.",
    downloadLink: "/path/to/sample1.pdf",
    fileSize: "1.2 MB",
  },
  {
    title: "Sample PDF 1",
    description: "Description for sample PDF 1.",
    downloadLink: "/path/to/sample1.pdf",
    fileSize: "1.2 MB",
  },
  {
    title: "Sample PDF 1",
    description: "Description for sample PDF 1.",
    downloadLink: "/path/to/sample1.pdf",
    fileSize: "1.2 MB",
  },
  {
    title: "Sample PDF 1",
    description: "Description for sample PDF 1.",
    downloadLink: "/path/to/sample1.pdf",
    fileSize: "1.2 MB",
  },
  {
    title: "Sample PDF 1",
    description: "Description for sample PDF 1.",
    downloadLink: "/path/to/sample1.pdf",
    fileSize: "1.2 MB",
  },
  {
    title: "Sample PDF 1",
    description: "Description for sample PDF 1.",
    downloadLink: "/path/to/sample1.pdf",
    fileSize: "1.2 MB",
  },
  {
    title: "Sample PDF 1",
    description: "Description for sample PDF 1.",
    downloadLink: "/path/to/sample1.pdf",
    fileSize: "1.2 MB",
  },
  {
    title: "Sample PDF 1",
    description: "Description for sample PDF 1.",
    downloadLink: "/path/to/sample1.pdf",
    fileSize: "1.2 MB",
  },
  {
    title: "Sample PDF 1",
    description: "Description for sample PDF 1.",
    downloadLink: "/path/to/sample1.pdf",
    fileSize: "1.2 MB",
  },
  {
    title: "Sample PDF 1",
    description: "Description for sample PDF 1.",
    downloadLink: "/path/to/sample1.pdf",
    fileSize: "1.2 MB",
  },
  {
    title: "Sample PDF 1",
    description: "Description for sample PDF 1.",
    downloadLink: "/path/to/sample1.pdf",
    fileSize: "1.2 MB",
  },
  {
    title: "Sample PDF 1",
    description: "Description for sample PDF 1.",
    downloadLink: "/path/to/sample1.pdf",
    fileSize: "1.2 MB",
  },
  {
    title: "Sample PDF 1",
    description: "Description for sample PDF 1.",
    downloadLink: "/path/to/sample1.pdf",
    fileSize: "1.2 MB",
  },
  {
    title: "Sample PDF 1",
    description: "Description for sample PDF 1.",
    downloadLink: "/path/to/sample1.pdf",
    fileSize: "1.2 MB",
  },
  {
    title: "Sample PDF 1",
    description: "Description for sample PDF 1.",
    downloadLink: "/path/to/sample1.pdf",
    fileSize: "1.2 MB",
  },
  {
    title: "Sample PDF 1",
    description: "Description for sample PDF 1.",
    downloadLink: "/path/to/sample1.pdf",
    fileSize: "1.2 MB",
  },
  // ... (other items)
];


const ITEMS_PER_PAGE = 12;

const HomePage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredDocuments, setFilteredDocuments] = useState(pdfDocuments);

  const handleSearch = (query: string) => {
    const filtered = pdfDocuments.filter((doc) =>
      doc.title.toLowerCase().includes(query.toLowerCase())
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
      <div
       className="w-full text-gray-600 mt-5 font-bold py-4 text-2xl text-center">
        Quel Document Recherchez-vous? Consultez Notre Banque de Documents!
      </div>

      <div className="container mx-auto px-4">
        <SearchBar onSearch={handleSearch} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {selectedDocuments.map((doc, index) => (
            <PdfCard
              id={index.toString()}
              key={index}
              title={doc.title}
              description={doc.description}
              downloadLink={doc.downloadLink}
              fileSize={doc.fileSize}
            />
          ))}
        </div>

        {/* Pagination */}
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
      </div>
    </div>
  );
};

export default HomePage;