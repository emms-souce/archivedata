import React from "react";
import Image from "next/image";

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  buttonText: string;
  onButtonClick: () => void;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  imageUrl,
  buttonText,
  onButtonClick,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105">
      <div className="relative h-56 w-full">
        <Image
          src={imageUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 hover:scale-110 object-cover"
        />
      </div>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <button
          onClick={onButtonClick}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md transition-colors duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Card;
