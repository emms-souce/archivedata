"use client";

import React from "react";

const AboutPage: React.FC = () => {
  return (
    <div className="w-full">
      <div className="w-full text-gray-600 mt-5 font-bold py-4 text-2xl text-center">
        À propos de nous
      </div>

      <div className="container mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Section 1: Mission */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Notre Mission</h2>
            <p className="text-gray-700">
              Nous nous engageons à fournir des solutions de haute qualité qui
              répondent aux besoins spécifiques de nos clients. Notre mission
              est de rendre l'accès à l'information plus simple, plus rapide et
              plus efficace.
            </p>
          </div>

          {/* Section 2: Valeurs */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Nos Valeurs</h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>Innovation continue</li>
              <li>Engagement envers la qualité</li>
              <li>Intégrité et transparence</li>
              <li>Orientation client</li>
              <li>Responsabilité sociale</li>
            </ul>
          </div>

          {/* Section 3: Histoire */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Notre Histoire</h2>
            <p className="text-gray-700">
              Depuis notre création en [année], nous avons évolué pour devenir
              un acteur clé dans notre domaine. Chaque étape de notre parcours
              reflète notre engagement envers l'excellence et l'innovation.
            </p>
          </div>

          {/* Section 4: Équipe */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              Rencontrez notre Équipe
            </h2>
            <p className="text-gray-700">
              Notre équipe est composée de professionnels passionnés et dévoués,
              chacun apportant son expertise pour garantir le succès de nos
              projets.
            </p>
          </div>
        </div>

        {/* Section 5: Appel à l'action */}
        <div className="mt-8 text-center">
          <a
            href="/contact"
            className="inline-block bg-blue-500 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition-colors"
          >
            Contactez-nous
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
