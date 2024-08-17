"use client";

import React, { useState } from "react";


const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to an API or email)
    console.log("Form data submitted:", formData);
    // Clear the form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="w-full">
      <div className="w-full text-gray-600 mt-2 font-bold py-2 text-2xl text-center">
        Contactez-nous
      </div>

      <div className="container mx-auto px-4 mt-3">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              Nos Informations de Contact
            </h2>
            <p className="text-gray-700 mb-4">
              N'hésitez pas à nous contacter pour toute question ou demande
              d'information. Notre équipe est à votre disposition pour vous
              aider.
            </p>
            <div className="text-gray-700">
              <p>
                <strong>Adresse :</strong> 123 Rue de l'Entreprise, Ville, Pays
              </p>
              <p>
                <strong>Téléphone :</strong> +33 1 23 45 67 89
              </p>
              <p>
                <strong>Email :</strong> contact@entreprise.com
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-2 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              Envoyez-nous un message
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Nom
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="subject"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Sujet
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  rows={5}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition-colors"
              >
                Envoyer
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
