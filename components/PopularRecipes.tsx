/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useRef, useEffect } from "react";
import Categories from "./reusable/Categories";
import supabase from "@/lib/supabase";

interface Recipe {
  id: number;
  title: string;
  image_url: string;
}

const PopularRecipes: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    "All"
  );
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRecipes = async (category: string) => {
    setLoading(true);

    let query = supabase
      .from("recipes")
      .select("id, title, image_url")
      .limit(5);

    if (category !== "All") {
      const { data: categoryData, error: categoryError } = await supabase
        .from("categories")
        .select("id")
        .eq("name", category)
        .single();

      if (categoryError) {
        console.error("Error fetching category:", categoryError);
        setLoading(false);
        return;
      }

      if (categoryData) {
        query = query.eq("category_id", categoryData.id);
      }
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching recipes:", error);
      setRecipes([]);
    } else if (data) {
      setRecipes(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!selectedCategory) return;
    // Schedule the fetch to run asynchronously so setState inside fetchRecipes
    // does not run synchronously within the effect body (avoids cascading renders)
    const scheduled = Promise.resolve().then(() =>
      fetchRecipes(selectedCategory)
    );
    // no cleanup needed for this simple scheduling; keep return for clarity
    return () => {
      // If you later add cancellable fetch logic, handle cleanup here.
      void scheduled;
    };
  }, [selectedCategory]);

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

      <Categories
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

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
        {loading ? (
          <>
            <div className="w-1/4 shrink-0 select-none">
              
              <div className="w-full h-80 bg-gray-200 rounded-lg">
                </div>

                <div className=" w-full h-4 bg-gray-200">

                </div>
            </div>
          </>
        ) : recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div key={recipe.id} className="w-1/4 shrink-0 select-none">
              <img
                src={recipe.image_url}
                alt={recipe.title}
                className="w-full h-80 bg-gray-200 rounded-lg object-cover pointer-events-none"
              />
              <h1 className="text-lg font-semibold">{recipe.title}</h1>
              <h1 className="text-sm text-black/50">by Sadika Inamdar</h1>
            </div>
          ))
        ) : (
          <p>No recipes found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default PopularRecipes;
