"use client";

import Card from "@/components/card";
import { useRouter } from "next/navigation";
import React from "react";

const Dashboard = () => {
  const router = useRouter();
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Tableau de Bord</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card
            onButtonClick={() => router.push("/dashboard/add-document")}
            buttonText="Ajouter un document"
            imageUrl="/upload.png"
            description="Téléchargez et ajoutez de nouveaux documents à la base de données"
            title="Uploader"
          />
          <Card
            onButtonClick={() => router.push("/dashboard/documents")}
            buttonText="Liste des documents"
            imageUrl="/docs.png"
            description="Consultez et gérez tous les documents existants"
            title="Documents"
          />
          <Card
            onButtonClick={() => router.push("/dashboard/users")}
            buttonText="Gestion des utilisateurs"
            imageUrl="/user.png"
            description="Administrez les comptes et les permissions des utilisateurs"
            title="Utilisateurs"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;