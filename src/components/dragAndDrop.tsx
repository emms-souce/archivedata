import React, { useState, ChangeEvent, DragEvent } from "react";

const DragAndDrop: React.FC = () => {
  const [dragging, setDragging] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // Prévenir le comportement par défaut
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);

    const files = event.dataTransfer.files;
    if (files.length > 0) {
      handleFiles(files);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      handleFiles(files);
    }
  };

  const handleFiles = (files: FileList) => {
    // Traitez les fichiers ici
    console.log("Files:", files);
    if (files.length > 0) {
      setSelectedFileName(files[0].name);
    }
  };

  const handleClick = () => {
    document.getElementById("fileInput")?.click();
  };

  return (
    <div
      className={`relative p-5 w-[300px] h-[300px]  md:w-[500px]  md:h-[400px] border-2 border-dashed rounded-lg transition-colors duration-300 ${
        dragging || selectedFileName
          ? "border-blue-500 bg-blue-100"
          : "border-gray-300 bg-gray-100"
      } flex items-center justify-center cursor-pointer`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        id="fileInput"
        type="file"
        className="hidden"
        multiple
        onChange={handleChange}
      />
      <p
        className={`text-center ${
          selectedFileName ? "text-blue-600 font-semibold" : "text-gray-600"
        }`}
      >
        {selectedFileName
          ? `Fichier sélectionné : ${selectedFileName}`
          : "Glissez-déposez des fichiers ici ou cliquez pour sélectionner"}
      </p>
    </div>
  );
};

export default DragAndDrop;
