import { API_BASE_URL } from "./config/apiRoutes";
import { useFormik, FormikTouched, FormikErrors } from "formik";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";


interface FormValues {
  firstName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}
interface Props {
  onUserAdd?: () => void;
}

const SignupModal:React.FC<Props> = ({onUserAdd}) => {
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

  useEffect(() => {
    console.log("ok");
  }, [change]);

  const apiRoute = API_BASE_URL;

  const submitFormData = async (values: FormValues) => {
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
        avatar_uuid: "",
        password: values.password,
      };

      const response = await fetch(
        `${apiRoute}/users/create`,
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
        throw new Error("Erreur lors de l'ajout des données. Vérifiez que l'email est unique.");
      }
      toast.success("Utilisateur créé avec succès");
      setIsModalOpen(false);
      onUserAdd && onUserAdd();
      const data = await response.json();
      console.log("Données envoyées avec succès :", data);
      setChange(!change);
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const formik = useFormik<FormValues>({
    initialValues: {
      firstName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Prénom requis"),
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
      await submitFormData(values);
    },
  });

  return (
    <div className="container mx-auto flex justify-center">
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md"
      >
        Ajouter un Utilisateur
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl relative w-full max-w-md mx-5">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>

            <form className="w-full" onSubmit={formik.handleSubmit}>
              <h2 className="text-3xl mb-6 text-center text-blue-600 font-bold">
                Ajouter un Utilisateur
              </h2>

              <div className="space-y-4">
                {(["firstName", "username", "email", "password", "confirmPassword"] as const).map((field) => (
                  <div key={field}>
                    <label
                      className="block text-gray-700 text-sm font-semibold mb-2"
                      htmlFor={field}
                    >
                      {field === "firstName" ? "Prénom" :
                       field === "username" ? "Nom" :
                       field === "email" ? "Email" :
                       field === "password" ? "Mot de passe" :
                       "Confirmez votre mot de passe"}
                    </label>
                    <div className="relative">
                      <input
                        className={`shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                          formik.touched[field] && formik.errors[field]
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        id={field}
                        type={field.includes("password") ? (field === "password" ? (showPassword ? "text" : "password") : (showConfirmPassword ? "text" : "password")) : field === "email" ? "email" : "text"}
                        placeholder={field === "firstName" ? "John" :
                                     field === "username" ? "Doe" :
                                     field === "email" ? "john.doe@example.com" :
                                     "********"}
                        {...formik.getFieldProps(field)}
                      />
                      {(field === "password" || field === "confirmPassword") && (
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 hover:text-gray-800"
                          onClick={() => field === "password" ? setShowPassword(!showPassword) : setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {(field === "password" ? showPassword : showConfirmPassword) ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                            </svg>
                          ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                            </svg>
                          )}
                        </button>
                      )}
                    </div>
                    {formik.touched[field] && formik.errors[field] ? (
                      <p className="text-red-500 text-xs mt-1">
                        {formik.errors[field]}
                      </p>
                    ) : null}
                  </div>
                ))}

                <div>
                  <label
                    className="block text-gray-700 text-sm font-semibold mb-2"
                    htmlFor="role"
                  >
                    Rôle
                  </label>
                  <select
                    id="role"
                    className={`shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                      formik.touched.role && formik.errors.role
                        ? "border-red-500"
                        : "border-gray-300"
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
                    <p className="text-red-500 text-xs mt-1">
                      {formik.errors.role}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="flex items-center justify-between mt-8">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                  type="button"
                >
                  Annuler
                </button>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
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