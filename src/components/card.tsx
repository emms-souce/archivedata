import React from "react";

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
    <div onClick={onButtonClick} className="min-w-[250px] cursor-pointer mx-auto bg-white shadow-lg p-2 rounded-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl">
      <img
        className="w-[300px] h-[200px]  object-cover"
        src={imageUrl}
        alt="Card image"
      />
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <p className="text-gray-600 mt-2">{description}</p>
       
      </div>
    </div>
  );
};

export default Card;
