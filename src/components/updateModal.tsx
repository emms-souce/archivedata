import { API_BASE_URL } from "./config/apiRoutes";
import { useFormik } from "formik";
import React, { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

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
}

interface UpdateUserModalProps {
  isOpen: boolean;
  user: User;
  onClose: () => void;
  onUserUpdated: () => void;
}

const UpdateUserModal: React.FC<UpdateUserModalProps> = ({
  isOpen,
  user,
  onClose,
  onUserUpdated,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const roles = [
    {
      title_fr: "Administrateur",
      title_en: "Administrator",
      code: "administrator",
      uuid: "4f6771b1-87f9-4fb8-9bfd-8edc7d3672da",
    },
    {
      title_fr: "Utilisateur",
      title_en: "User",
      code: "user",
      uuid: "5f6771b1-87f9-4fb8-9bfd-8edc7d3672db",
    },
  ];
  const apiroute = API_BASE_URL;

  const submitFormData = async (values: any) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token non trouvé");
        return;
      }

      const requestBody = {
        email: values.email,
        firstname: values.firstName,
        lastname: values.username,
        role_uuid: values.role,
        uuid: user.uuid,
        password: values.password
      };

      const url = `${apiroute}/users/`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        toast.error("Erreur lors de la mise à jour des données");
        throw new Error("Erreur lors de la mise à jour des données");
      }

      toast.success("Utilisateur mis à jour avec succès");
      onClose();
      onUserUpdated();
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: user.firstname || "",
      username: user.lastname || "",
      email: user.email || "",
      password: "",
      confirmPassword: "",
      role: user.role?.uuid || "",
      uuid: user.uuid,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Prénom requis"),
      username: Yup.string().required("Nom requis"),
      email: Yup.string().email("Email invalide").required("Email requis"),
      password: Yup.string(),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("password")],
        "Les mots de passe doivent correspondre"
      ),
      role: Yup.string().required("Rôle requis"),
    }),
    onSubmit: async (values) => {
      await submitFormData(values);
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl relative w-full max-w-md mx-5">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
            Modifier l'Utilisateur
          </h2>

          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              Prénom
            </label>
            <input
              id="firstName"
              type="text"
              {...formik.getFieldProps("firstName")}
              className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formik.touched.firstName && formik.errors.firstName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Prénom"
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.firstName}</p>
            )}
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Nom
            </label>
            <input
              id="username"
              type="text"
              {...formik.getFieldProps("username")}
              className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formik.touched.username && formik.errors.username ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Nom d'utilisateur"
            />
            {formik.touched.username && formik.errors.username && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.username}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...formik.getFieldProps("email")}
              className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formik.touched.email && formik.errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Email"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
            )}
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Mot de passe (laisser vide pour ne pas changer)
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              {...formik.getFieldProps("password")}
              className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formik.touched.password && formik.errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="********"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 top-5 flex items-center text-sm leading-5"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg className="h-6 w-6  text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              ) : (
                <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              )}
            </button>
            {formik.touched.password && formik.errors.password && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.password}</p>
            )}
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              Rôle
            </label>
            <select
              id="role"
              {...formik.getFieldProps("role")}
              className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formik.touched.role && formik.errors.role ? "border-red-500" : "border-gray-300"
              }`}
            >
              {roles.map((r) => (
                <option key={r.uuid} value={r.uuid}>
                  {r.title_fr}
                </option>
              ))}
            </select>
            {formik.touched.role && formik.errors.role && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.role}</p>
            )}
          </div>

          <div className="flex justify-between space-x-4">
            <button
              onClick={onClose}
              className="w-full bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition-colors duration-200"
              type="button"
            >
              Annuler
            </button>
            <button
              className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-colors duration-200"
              type="submit"
            >
              Mettre à jour
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserModal;