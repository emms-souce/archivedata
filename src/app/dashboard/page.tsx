"use client";

import Card from "@/components/card";
import { useRouter } from "next/navigation";
import React from "react";


const Dashboard = () => {
  const router = useRouter();
  return (
    <div className=" container mx-auto p-5 ">
      <div className="grid  grid-cols-1 md:grid-cols-2 items-center lg:grid-cols-3 gap-4">
        <Card
          onButtonClick={() => {
            router.push("/dashboard/users");
          }}
          buttonText="test buttom"
          imageUrl="/user.png"
          description="list des User"
          title="Utilisateur"
        />
        <Card
          onButtonClick={() => {
            router.push("/dashboard/documents");
          }}
          buttonText="test buttom"
          imageUrl="/docs.png"
          description="list des document"
          title="Document"
        />
        <Card
          onButtonClick={() => {
            router.push(" /dashboard/add-document");
          }}
          buttonText="test buttom"
          imageUrl="/upload.png"
          description="Ajouter un document "
          title="Uploader"
        />
      </div>
    </div>
  );
};

export default Dashboard;