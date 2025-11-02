"use client";
import { useState, useEffect } from "react";
import supabase from "@/lib/supabase";

interface Category {
  id: number;
  name: string;
  image_url: string;
}

const Categories = ({
  selectedCategory,
  setSelectedCategory,
  type,
}: {
  selectedCategory: string;
  setSelectedCategory: (category: { id: number; name: string } | null) => void;
  type?: "allrecipe";
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        console.log("Fetching categories...");
        const { data, error } = await supabase
          .from("categories")
          .select("id, name, image_url");

        if (error) {
          console.error("Categories fetch failed:", error.message);
          return;
        }

        setCategories(data);
      } catch (error) {
        console.error("Categories fetch failed:", error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="flex flex-row justify-between">
      <div className="flex items-center gap-4">
        <div
          onClick={() => setSelectedCategory({ id: 0, name: "All" })}
          className={`py-2 px-6 rounded-full text-sm cursor-pointer ${
            selectedCategory === "All"
              ? "bg-[#CE2425] text-white"
              : "bg-[#F7F7F7] text-black"
          }`}
        >
          All
        </div>
        {loadingCategories && <p>Loading categories...</p>}
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => setSelectedCategory(category)}
            className={`py-2 px-6 rounded-full text-sm cursor-pointer ${
              selectedCategory === category.name
                ? "bg-[#CE2425] text-white"
                : "bg-[#F7F7F7] text-black"
            }`}
          >
            {category.name}
          </div>
        ))}
      </div>
      {type !== "allrecipe" && (
        <button className="hover:underline cursor-pointer">View All</button>
      )}
    </div>
  );
};

export default Categories;
