import React from "react";

interface CardProps {
  type: string;
  title: string;
  image: string;
}

const Card: React.FC<CardProps> = ({ type, title, image }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer">
      <img
        src={`assets/images/${image}`}
        alt={title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-sm text-gray-500">Type: {type}</p>
      </div>
    </div>
  );
};

export default Card;
