"use client";
import React, { useState, useRef } from "react";
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
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1; // adjust scroll speed
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const onMouseUpOrLeave = () => setIsDragging(false);

  // Touch events for mobile
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !sliderRef.current) return;
    const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1; // adjust scroll speed
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const onTouchEnd = () => setIsDragging(false);

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

      <div
        ref={sliderRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUpOrLeave}
        onMouseLeave={onMouseUpOrLeave}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className="w-full py-2 mt-5 flex gap-5 overflow-x-auto scrollbar-hide"
      >
        <div className="w-1/4 shrink-0">
          <div className="w-full h-80 bg-amber-200 rounded-lg"></div>
          <h1 className="text-lg font-semibold">Lorem Ipsum</h1>
          <h1 className="font-light text-sm -mt-1">By Sadika Inamdar</h1>
        </div>
        <div className="w-1/4 shrink-0">
          <div className="w-full h-80 bg-amber-200 rounded-lg"></div>
          <h1 className="text-lg font-semibold">Lorem Ipsum</h1>
          <h1 className="font-light text-sm -mt-1">By Sadika Inamdar</h1>
        </div>
        <div className="w-1/4 shrink-0">
          <div className="w-full h-80 bg-amber-200 rounded-lg"></div>
          <h1 className="text-lg font-semibold">Lorem Ipsum</h1>
          <h1 className="font-light text-sm -mt-1">By Sadika Inamdar</h1>
        </div>
        <div className="w-1/4 shrink-0">
          <div className="w-full h-80 bg-amber-200 rounded-lg"></div>
          <h1 className="text-lg font-semibold">Lorem Ipsum</h1>
          <h1 className="font-light text-sm -mt-1">By Sadika Inamdar</h1>
        </div>
        <div className="w-1/4 shrink-0">
          <div className="w-full h-80 bg-amber-200 rounded-lg"></div>
          <h1 className="text-lg font-semibold">Lorem Ipsum</h1>
          <h1 className="font-light text-sm -mt-1">By Sadika Inamdar</h1>
        </div>
      </div>
    </div>
  );
};

export default PopularRecipes;
