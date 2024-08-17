"use client";

import { LoginResponse } from "@/type/type";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  async function fetchLoginData(
    url: string,
    username: string,
    password: string
  ): Promise<void> {
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
         toast.error(" l'adresse email ou le mot de passe est incorrect");
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: LoginResponse = await response.json();
      if (response.status !== 200) {
        // toast.error(" l'adresse email ou le mot de passe est incorrect");
      }
      // Stocker les données utilisateur et le token dans le localStorage
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token.access_token);
      router.push("/user");
      console.log("Login data stored successfully!");
    } catch (error) {
      console.error("Failed to fetch login data:", error);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Must be at least 6 characters")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      console.log("Form data", values);

      // Appel de la fonction fetchLoginData lors de la soumission du formulaire
      await fetchLoginData(
        "https://archive-doc-app.onrender.com/api/v1/auths/login/administrator",
        values.email,
        values.password
      );
    },
  });

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="md:w-1/2 w-full flex justify-center items-center bg-blue-500 p-4">
        <svg
          className="animate-spin h-32 w-32 text-white"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
      </div>
      <div className="md:w-1/2 w-full flex justify-center items-center p-4">
        <form className="w-full max-w-sm" onSubmit={formik.handleSubmit}>
          <h2 className="text-2xl mb-6 text-center text-blue-400 font-bold">
            Se connecter
          </h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Votre Email
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : ""
              }`}
              id="email"
              type="email"
              placeholder="email"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="text-red-500 text-xs italic">
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
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline ${
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
          <div className="flex items-center justify-between">
            <button
              // onClick={()=>{ toast.error(" l'adresse email ou le mot de passe est incorrect");}}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Se connecter
            </button>
            <Link className="text-blue-400 hover:underline" href={"/"}>
              Acceuil
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;