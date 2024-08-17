"use client"
import { useFormik } from "formik";
import Link from "next/link";
import React, { useState } from "react";
import * as Yup from "yup";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(2, "Must be at least 2 characters")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Must be at least 6 characters")
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: (values) => {
        console.log("Form data", values);
        
    },
  });

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="md:w-1/2 w-full flex justify-center items-center bg-blue-500 p-4">
        <svg
          className="animate-spin h-32 w-32 text-white"
          xmlns="http://www.w3.org/2000/svg"
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
            Inscrivez vous 
          </h2>
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
              placeholder="Username"
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
              className="absolute top-8  right-0 px-3 flex items-center "
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
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline ${
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? "border-red-500"
                  : ""
              }`}
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="********"
              {...formik.getFieldProps("confirmPassword")}
            />
            
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <p className="text-red-500 text-xs italic">
                {formik.errors.confirmPassword}
              </p>
            ) : null}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              S'inscrire
                      </button>
                      
                      <Link className="text-blue-400 hover:underline" href={"/login"}> Se connecter</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
