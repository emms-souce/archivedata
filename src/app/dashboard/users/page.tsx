"use client";

import SignupModal from "@/components/singUpModal";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

// Adapter l'interface User aux données de l'API
interface Role {
  uuid: string;
  title_fr: string;
  title_en: string;
  code: string;
}

interface User {
  uuid: string;
  firstname: string;
  lastname: string;
  email: string;
  role: Role; // Modifier le type de `role` pour refléter l'objet
  status: string;
  date_added: string;
  date_modified: string;
}

const Dashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [c, setC] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  const deleteUser = async (userId: string) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token non trouvé");
        return;
      }

      const response = await fetch(
        `https://archive-doc-app.onrender.com/api/v1/users/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        toast.error("Erreur lors de la suppression de l'utilisateur");
        throw new Error("Erreur lors de la suppression de l'utilisateur");
      }

      toast.success("Utilisateur supprimé avec succès");
      setC(!c);
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      // Récupérer le token depuis le local storage
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Access token not found in local storage");
        return;
      }

      try {
        const response = await fetch(
          "https://archive-doc-app.onrender.com/api/v1/users/?page=1&per_page=30",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Ajouter le token ici
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          // Mettre à jour les utilisateurs avec les données de l'API
          setUsers(data.data || []);
          setFilteredUsers(data.data || []);
        } else {
          console.error("Erreur lors de la requête:", response.status);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };

    fetchData();
  }, [c]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = users.filter(
      (user) =>
        `${user.firstname} ${user.lastname}`.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );

    setFilteredUsers(filtered);
  };

  return (
    <div className="container mx-auto p-5">
      <div className="w-full flex justify-end mb-5">
        <div>
          <SignupModal />
        </div>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-md"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-lg">
          <thead>
            <tr>
              <th className="py-3 px-6 text-left text-gray-600 font-bold uppercase border-b">
                Prénom Nom
              </th>
              <th className="py-3 px-6 text-left text-gray-600 font-bold uppercase border-b">
                Email
              </th>
              <th className="py-3 px-6 text-left text-gray-600 font-bold uppercase border-b">
                Rôle
              </th>
              <th className="py-3 px-6 text-center text-gray-600 font-bold uppercase border-b">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers?.map((user) => (
              <tr key={user.uuid} className="hover:bg-gray-100">
                <td className="py-4 px-6 border-b text-gray-800">
                  {`${user.firstname} ${user.lastname}`}
                </td>
                <td className="py-4 px-6 border-b text-gray-800">
                  {user.email}
                </td>
                <td className="py-4 px-6 border-b text-gray-800">
                  {user.role.title_fr}{" "}
                  {/* Modifier ici pour afficher le titre du rôle */}
                </td>
                <td className="py-4 px-6 border-b text-center">
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => {
                        deleteUser(user.uuid);
                      }}
                      className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600 transition-colors"
                    >
                      Supprimer
                    </button>
                    <button
                      onClick={() => {}}
                      className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600 transition-colors"
                    >
                      Modifier
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="py-4 px-6 border-b text-center text-gray-500"
                >
                  Aucun utilisateur trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
