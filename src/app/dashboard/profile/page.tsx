"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";


type User = {
  avatar: string | null;
  date_added: string;
  date_modified: string;
  email: string;
  firstname: string;
  is_new_user: boolean;
  lastname: string;
  role: {
    uuid: string;
    title_fr: string;
    title_en: string;
  };
  uuid: string;
};

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser) as User);
    } else {
      router.push("/login");
    }
  }, [router]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-500 mb-4 text-center">
          Profil de l'utilisateur
        </h2>
        <div className="mb-4">
          <p className="text-gray-700 font-semibold">Nom :</p>
          <p className="text-gray-900 font-semibold">{user.firstname}{ user.lastname}</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-700 font-semibold">Email :</p>
          <p className="text-gray-900 font-semibold">{user.email}</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-700 font-semibold">Rôle :</p>
          <p className="text-gray-900">{user.role.title_fr}</p>
        </div>

        <div className="flex items-center justify-between mt-6">
          <Link href="/dashboard" className="text-blue-500 hover:underline">
            Retour au tableau de bord
          </Link>
          <button
            onClick={() => {
              localStorage.clear();
              router.push("/login");
            }}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;