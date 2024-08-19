import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";


const SignupModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [change, setChange] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const roles = [
    {
      title_fr: "Administrateur",
      title_en: "Administrator",
      code: "administrator",
      description: "",
      uuid: "4f6771b1-87f9-4fb8-9bfd-8edc7d3672da",
      date_added: "2024-08-13T05:17:18.382721",
      date_modified: "2024-08-17T00:29:27.652998",
    },
    {
      title_fr: "Utilisateur",
      title_en: "User",
      code: "user",
      description: "",
      uuid: "5f6771b1-87f9-4fb8-9bfd-8edc7d3672db",
      date_added: "2024-08-17T00:29:31.147107",
      date_modified: "2024-08-17T00:29:31.147126",
    },
  ];

  useEffect(()=>{console.log("ok");},[change])

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
          lastname: values.username, // Utilisation du champ username comme lastname
          role_uuid: values.role, // Utilisation de l'UUID du rôle directement
          avatar_uuid: "", // Placeholder pour avatar_uuid
        };

        const response = await fetch(
          "https://archive-doc-app.onrender.com/api/v1/users/create",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(requestBody),
          }
        );

        if (!response.ok) {
           toast.error("Erreur lors de l'envoi des données"); 
          throw new Error("Erreur lors de l'ajout des données verifiez que l'email est unique");
           
        }
        toast.success("Utilisateur créé avec success")  
        setIsModalOpen(false);
        const data = await response.json();
        console.log("Données envoyées avec succès :", data);
        setChange(!change);
      } catch (error) {
        console.error("Erreur:", error);
      }
    };

  // Initialisation de Formik avec validation
  const formik = useFormik({
    initialValues: {
      firstName: "", // Ajout du champ pour le prénom
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Prénom requis"), // Validation pour le prénom
      username: Yup.string().required("Nom requis"),
      email: Yup.string().email("Email invalide").required("Email requis"),
      password: Yup.string().required("Mot de passe requis"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Les mots de passe doivent correspondre")
        .required("Confirmez le mot de passe"),
      role: Yup.string().required("Rôle requis"),
    }),
    onSubmit: async (values) => {
      console.log("Formulaire soumis avec les valeurs:", values);
      await submitFormData(values); // Appel de la fonction d'envoi des données
    },
  });

  return (
    <div className="container mx-auto flex justify-center">
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors"
      >
        Ajouter un Utilisateur
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-2 rounded-lg shadow-lg relative w-full max-w-lg mx-5">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-0 right-0 m-4 text-gray-700 hover:text-gray-900"
            >
              ✕
            </button>

            <form className="w-full max-w-sm mx-auto" onSubmit={formik.handleSubmit}>
              <h2 className="text-2xl mb-6 text-center text-blue-400 font-bold">
                Ajouter un Utilisateur
              </h2>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
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
                  className="block text-gray-700 text-sm font-bold mb-2"
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
                  className="block text-gray-700 text-sm font-bold mb-2"
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
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Mot de passe
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

              <div className="mb-6 relative">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="confirmPassword"
                >
                  Confirmez votre mot de passe
                </label>
                <input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                      ? "border-red-500"
                      : ""
                  }`}
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="********"
                  {...formik.getFieldProps("confirmPassword")}
                />
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                  <p className="text-red-500 text-xs italic">
                    {formik.errors.confirmPassword}
                  </p>
                ) : null}
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
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
                  <option value="" label="Sélectionnez un rôle" />
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
                  onClick={() => setIsModalOpen(false)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Annuler
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Ajouter l'utilisateur
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignupModal;