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


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  const router = useRouter();

  async function fetchLoginData(
    url: string,
    username: string,
    password: string
  ): Promise<void> {
    setLoading(true); // Start loading
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
        toast.error(" l'adresse email ou le mot de passe est incorrect");
      }

      localStorage.setItem("role", data.user.role.title_fr);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token.access_token);

      if (data.user.role.title_fr === "Administrateur") {
        router.push("/dashboard");
      } else {
        router.push("/user");
      }

      console.log("Login data stored successfully!");
    } catch (error) {
      console.error("Failed to fetch login data:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  }

    const apiroute = API_BASE_URL;

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

      await fetchLoginData(
        `${apiroute}/auths/login/administrator`,
        values.email,
        values.password
      );
    },
  });

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <ToastContainer/>
      <div className="md:w-1/2 w-full flex flex-col justify-center items-center bg-blue-500 p-4">
        <div className="text-3xl font-bold text-white">BankDocs</div>
        <Image src={"/Animation.gif"} width={200} height={200} alt="" />
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
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center"
              type="submit"
              disabled={loading}
            >
              {loading ? (
               <div className="flex"> <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white mr-2"></div>connexion...</div>
              ) : (
                "Se connecter"
              )}
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