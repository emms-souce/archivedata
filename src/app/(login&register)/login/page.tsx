"use client";

import { API_BASE_URL } from "@/components/config/apiRoutes";
import { LoginResponse } from "@/type/type";
import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function fetchLoginData(
    url: string,
    username: string,
    password: string
  ): Promise<void> {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: username,
          password: password,
        }),
      });

      if (!response.ok) {
        toast.error("L'adresse email ou le mot de passe est incorrect");
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: LoginResponse = await response.json();
      localStorage.setItem("role", data.user.role.title_fr);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token.access_token);

      if (data.user.role.title_fr === "Administrateur") {
        router.push("/dashboard");
      } else {
        router.push("/user");
      }
    } catch (error) {
      console.error("Failed to fetch login data:", error);
    } finally {
      setLoading(false);
    }
  }

  const apiroute = API_BASE_URL;

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Adresse email invalide").required("Champ requis"),
      password: Yup.string()
        .min(6, "Le mot de passe doit contenir au moins 6 caractères")
        .required("Champ requis"),
    }),
    onSubmit: async (values) => {
      await fetchLoginData(
        `${apiroute}/auths/login/administrator`,
        values.email,
        values.password
      );
    },
  });

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <ToastContainer />
      <div className="md:w-1/2 w-full flex flex-col justify-center items-center bg-blue-600 p-8">
        <div className="text-4xl font-bold text-white mb-4">BankDocs</div>
        <Image src="/Animation.gif" width={300} height={300} alt="BankDocs Animation" className="rounded-lg shadow-lg" />
      </div>
      <div className="md:w-1/2 w-full flex justify-center items-center p-8">
        <form className="w-full max-w-md bg-white shadow-lg rounded-lg p-8" onSubmit={formik.handleSubmit}>
          <h2 className="text-3xl mb-6 text-center text-blue-600 font-bold">
            Se connecter
          </h2>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Votre Email
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : ""
              }`}
              id="email"
              type="email"
              placeholder="email@exemple.com"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="text-red-500 text-xs italic mt-1">
                {formik.errors.email}
              </p>
            ) : null}
          </div>
          <div className="mb-6 relative">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Mot de passe
            </label>
            <div className="relative">
              <input
                className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 ${
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
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
            {formik.touched.password && formik.errors.password ? (
              <p className="text-red-500 text-xs italic mt-1">
                {formik.errors.password}
              </p>
            ) : null}
          </div>
          <div className="flex items-center justify-between mb-6">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out w-full"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <div className="flex justify-center items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white mr-2"></div>
                  Connexion...
                </div>
              ) : (
                "Se connecter"
              )}
            </button>
          </div>
          <div className="text-center">
            <Link className="text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out" href="/">
              Retour à l'accueil
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;