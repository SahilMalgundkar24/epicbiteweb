import React from "react";
import { FaArrowRight } from "react-icons/fa";

interface RecipeCardProps {
  title: string;
  image: string;
  author?: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ title, image, author }) => {
  return (
    <>
      <div className="w-96 rounded-xl overflow-hidden cursor-pointer relative">
        <div className="relative w-full h-72">
          {/* Image */}
          <img src={image} alt={title} className="w-full h-full object-cover" />

          {/* Black overlay */}
          <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/70"></div>

          {/* Title text at bottom */}
          <div className="absolute bottom-0 left-0 w-full p-4 text-white z-10">
            <h3 className="text-lg font-semibold leading-tight">{title}</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeCard;
