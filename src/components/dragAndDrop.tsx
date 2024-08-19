import React, { useState, ChangeEvent, DragEvent } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const handleFiles = async (files: FileList) => {
    for (let i = 0; i < files.length; i++) {
      await uploadFile(files[i]); // Appel de la fonction pour envoyer chaque fichier
    }
  };

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file); // Ajoute le fichier à l'objet FormData
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "https://archive-doc-app.onrender.com/api/v1/storages/upload",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`, // Token d'authentification
          },
          body: formData, // Utiliser FormData comme body
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de l'upload du fichier");
      }

      const data = await response.json();
      setSelectedFileName(file.name);
      toast.success(`Fichier "${file.name}" uploadé avec succès`);
      console.log("Fichier uploadé avec succès :", data);
    } catch (error) {
      console.error("Erreur lors de l'envoi du fichier :", error);
      toast.error(`Erreur lors de l'upload du fichier "${file.name}"`);
    }
  };

  const handleClick = () => {
    document.getElementById("fileInput")?.click();
  };

  return (
    <div className="relative">
      <ToastContainer />
      <div
        className={`p-5 w-[300px] h-[300px] md:w-[500px] md:h-[400px] border-2 border-dashed rounded-lg transition-colors duration-300 ${
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
    </div>
  );
};

export default DragAndDrop;
