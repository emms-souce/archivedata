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
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        uuid:user.uuid  // Placeholder pour avatar_uuid
      };

      const url = `https://archive-doc-app.onrender.com/api/v1/users/`;

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
      onUserUpdated(); // Refresh user list
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

  return (
    <div className={` ${!isOpen?"hidden":"flex"} fixed inset-0 -left-2 flex items-center justify-center bg-black bg-opacity-10 z-50`}>
      <div className="bg-white p-2 rounded-lg shadow-lg relative w-full max-w-lg mx-5">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 m-4 text-gray-700 hover:text-gray-900"
        >
          ✕
        </button>

        <form
          className="w-full max-w-sm mx-auto"
          onSubmit={formik.handleSubmit}
        >
          <h2 className="text-2xl mb-6 text-center text-blue-400 font-bold">
            Modifier l'Utilisateur
          </h2>

          <div className="mb-4">
            <label
              className="block  text-left text-gray-700 text-sm font-bold mb-2"
              htmlFor="firstName"
            >
              Prénom
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                formik.touched.firstName && formik.errors.firstName
                  ? "border-red-500"
                  : ""
              }`}
              id="firstName"
              type="text"
              placeholder="Prénom"
              {...formik.getFieldProps("firstName")}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <p className="text-red-500 text-xs italic">
                {formik.errors.firstName}
              </p>
            ) : null}
          </div>

          <div className="mb-4">
            <label
              className="block text-left  text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Nom
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                formik.touched.username && formik.errors.username
                  ? "border-red-500"
                  : ""
              }`}
              id="username"
              type="text"
              placeholder="Nom d'utilisateur"
              {...formik.getFieldProps("username")}
            />
            {formik.touched.username && formik.errors.username ? (
              <p className="text-red-500 text-xs italic">
                {formik.errors.username}
              </p>
            ) : null}
          </div>

          <div className="mb-4">
            <label
              className="block  text-left text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : ""
              }`}
              id="email"
              type="email"
              placeholder="Email"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="text-red-500 text-xs italic">
                {formik.errors.email}
              </p>
            ) : null}
          </div>

          <div className="mb-4 relative">
            <label
              className="block  text-left text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Mot de passe (laisser vide pour ne pas changer)
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : ""
              }`}
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="********"
              {...formik.getFieldProps("password")}
            />
            <button
              type="button"
              className="absolute top-8 right-0 px-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
            {formik.touched.password && formik.errors.password ? (
              <p className="text-red-500 text-xs italic">
                {formik.errors.password}
              </p>
            ) : null}
          </div>

          <div className="mb-4">
            <label
              className="block text-left text-gray-700 text-sm font-bold mb-2"
              htmlFor="role"
            >
              Rôle
            </label>
            <select
              id="role"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                formik.touched.role && formik.errors.role
                  ? "border-red-500"
                  : ""
              }`}
              {...formik.getFieldProps("role")}
            >
              {roles.map((r) => (
                <option key={r.uuid} value={r.uuid}>
                  {r.title_fr}
                </option>
              ))}
            </select>
            {formik.touched.role && formik.errors.role ? (
              <p className="text-red-500 text-xs italic">
                {formik.errors.role}
              </p>
            ) : null}
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Annuler
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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