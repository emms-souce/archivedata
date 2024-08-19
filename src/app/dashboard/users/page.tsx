"use client";

import SignupModal from "@/components/singUpModal";
import UpdateModal from "@/components/updateModal";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

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
  role: Role;
  status: string;
  date_added: string;
  date_modified: string;
}

const Dashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [c, setC] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

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
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
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
    setCurrentPage(1); // Reset to first page when search query changes
  };

  // Calculate users to display based on the current page
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Calculate total pages
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const [openUpdate, setOpenUpdate] = useState(false)
  
  const open = () => {
    setOpenUpdate(!openUpdate)
  }
  const close = () => {
    setOpenUpdate(!openUpdate)
  }

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
          className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 shadow-md"
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
            {currentUsers?.map((userItem) => (
              <tr key={userItem.uuid} className="hover:bg-gray-100">
                 < UpdateModal user={userItem} isOpen={openUpdate} onClose={close} onUserUpdated={open} />
                <td className="py-4 px-6 border-b text-gray-800">
                  {`${userItem.firstname} ${userItem.lastname}`}
                </td>
                <td className="py-4 px-6 border-b text-gray-800">
                  {userItem.email}
                </td>
                <td className="py-4 px-6 border-b text-gray-800">
                  {userItem.role.title_fr}
                </td>
                <td className="py-4 px-6 border-b text-center">
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => {
                        deleteUser(userItem.uuid);
                      }}
                      className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600 transition-colors"
                    >
                      Supprimer
                    </button>
                     <button
                      onClick={() => { open(); console.log(userItem)} }
                      className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600 transition-colors"
                    >
                      Modifier
                    </button> 
                   
                  </div>
                </td>
              </tr>
            ))}
            {currentUsers.length === 0 && (
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
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`py-2 px-4 rounded ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Précédent
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`py-2 px-4 rounded ${
                currentPage === page
                  ? "bg-blue-800 text-white"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`py-2 px-4 rounded ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
