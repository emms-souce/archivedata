"use client";

import Card from "@/components/card";
import DragAndDrop from "@/components/dragAndDrop";
import React from "react";

const Dashboard = () => {
  return (
    <div className=" container mx-auto p-5 ">
      <div className="grid  grid-cols-1 md:grid-cols-2 items-center lg:grid-cols-3 gap-2">
        <Card
          onButtonClick={() => {}}
          buttonText="test buttom"
          imageUrl="lqsdjkdkqsldsk"
          description="list des User"
          title="Utilisateur"
        />
        <Card
          onButtonClick={() => {}}
          buttonText="test buttom"
          imageUrl="lqsdjkdkqsldsk"
          description="list des document"
          title="Document"
        />
        <Card
          onButtonClick={() => {}}
          buttonText="test buttom"
          imageUrl="lqsdjkdkqsldsk"
          description="list des "
          title="profile"
        />
      </div>
    </div>
  );
};

export default Dashboard;
