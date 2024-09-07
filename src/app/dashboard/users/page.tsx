"use client";

import { API_BASE_URL } from "@/components/config/apiRoutes";
import SignupModal from "@/components/singUpModal";
import UpdateModal from "@/components/updateModal";
import React, { useEffect, useState } from "react";
import { FaSearch, FaTrash, FaEdit, FaUserPlus } from "react-icons/fa";
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
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [c, setC] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const itemsPerPage = 8;
  const apiroute = API_BASE_URL;

  const deleteUser = async (userId: string) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token non trouvé");
        return;
      }

      const response = await fetch(`${apiroute}/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        toast.error("Erreur lors de la suppression de l'utilisateur");
        throw new Error("Erreur lors de la suppression de l'utilisateur");
      }

      toast.success("Utilisateur supprimé avec succès");
      setUsers(users.filter((user) => user.uuid !== userId));
      setFilteredUsers(filteredUsers.filter((user) => user.uuid !== userId));
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Access token not found in local storage");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${apiroute}/users/?page=1&per_page=1000`,
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
      } finally {
        setIsLoading(false);
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
    setCurrentPage(1);
  };

  const openUpdateModal = (user: User) => {
    setSelectedUser(user);
    setOpenUpdate(true);
  };

  const closeUpdateModal = () => {
    setOpenUpdate(false);
    setSelectedUser(null);
  };

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
       
        <SignupModal />
      </div>

      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Rechercher un utilisateur..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
        />
        <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Nom Complet
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Rôle
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 whitespace-nowrap">
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                  </div>
                </td>
              </tr>
            ) : (
              currentUsers.map((userItem) => (
                <tr key={userItem.uuid} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{`${userItem.firstname} ${userItem.lastname}`}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {userItem.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {userItem.role.title_fr}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <button
                      onClick={() => openUpdateModal(userItem)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      <FaEdit className="inline-block" />
                    </button>
                    <button
                      onClick={() => deleteUser(userItem.uuid)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FaTrash className="inline-block" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {!isLoading && currentUsers.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          Aucun utilisateur trouvé
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                currentPage === 1
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              Précédent
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                  currentPage === page
                    ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                    : "text-gray-500 hover:bg-gray-50"
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

      {selectedUser && (
        <UpdateModal
          user={selectedUser}
          isOpen={openUpdate}
          onClose={closeUpdateModal}
          onUserUpdated={() => setC(!c)}
        />
      )}
    </div>
  );
};

export default Dashboard;
