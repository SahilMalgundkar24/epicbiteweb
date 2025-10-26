import React from "react";
import RecipeCard from "./reusable/RecipeCard";
import Categories from "./reusable/Categories";

interface Recipe {
  id: number;
  title: string;
  image: string;
  author?: string;
  time?: string;
}

const PopularRecipes: React.FC = () => {
  const recipes: Recipe[] = [
    {
      id: 1,
      title: "Spicy Vermicelli Noodles Salad",
      image:
        "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&h=200&fit=crop",
      author: "Chef Aditi",
    },
    {
      id: 2,
      title: "Classic Italian Beef Maltagliati",
      image: "/italian-food.png",
      author: "Chef Marco",
    },
    {
      id: 3,
      title: "Sour & Spicy Korean Kimchi",
      image:
        "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&h=200&fit=crop",
      author: "Chef Min-Ji",
    },
    {
      id: 4,
      title: "Spicy Veg Biryani",
      image:
        "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&h=200&fit=crop",
      author: "Chef Aarav",
    },
  ];

  const handleRecipeClick = (id: number) => {
    console.log("Recipe clicked:", id);
    // You can navigate or show modal here
  };

  return (
    <div className="py-8">
      <h2 className="text-2xl md:text-4xl font-semibold">
        Popular <span className="text-[#CE2425]">Recipes</span>
      </h2>
      <p className="mb-5 text-gray-600">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique,
        illo.
      </p>

      <Categories />

      <div className="w-full py-2 mt-5 flex gap-5">
        <div className="w-1/4">
          <div className="w-full h-72 bg-amber-200 rounded-lg"></div>
          <h1 className="text-xl font-semibold">Lorem Ipsum</h1>
          <h1 className="font-light">By Sadika Inamdar</h1>
        </div>
        <div className="w-1/4">
          <div className="w-full h-72 bg-amber-200 rounded-lg"></div>
          <h1 className="text-xl font-semibold">Lorem Ipsum</h1>
          <h1 className="font-light">By Sadika Inamdar</h1>
        </div>
        <div className="w-1/4">
          <div className="w-full h-72 bg-amber-200 rounded-lg"></div>
          <h1 className="text-xl font-semibold">Lorem Ipsum</h1>
          <h1 className="font-light">By Sadika Inamdar</h1>
        </div>
        <div className="w-1/4">
          <div className="w-full h-72 bg-amber-200 rounded-lg"></div>
          <h1 className="text-xl font-semibold">Lorem Ipsum</h1>
          <h1 className="font-light">By Sadika Inamdar</h1>
        </div>
      </div>
    </div>
  );
};

export default PopularRecipes;
