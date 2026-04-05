"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import supabase from "@/lib/supabase";
import { FaFilePdf } from "react-icons/fa6";

interface PdfRecipe {
  id: number;
  title: string;
  category: "Veg" | "Non-Veg";
  pdf_url: string;
  created_at: string;
}

type Filter = "All" | "Veg" | "Non-Veg";

const filters: Filter[] = ["All", "Veg", "Non-Veg"];

export default function PdfRecipesPage() {
  const [recipes, setRecipes] = useState<PdfRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<Filter>("All");

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      let query = supabase
        .from("pdf_recipes")
        .select("id, title, category, pdf_url, created_at")
        .order("created_at", { ascending: false });

      if (selectedFilter !== "All") {
        query = query.eq("category", selectedFilter);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching pdf recipes:", error);
        setRecipes([]);
      } else {
        setRecipes(data || []);
      }
      setLoading(false);
    };

    fetchRecipes();
  }, [selectedFilter]);

  return (
    <div className="px-5 md:px-10 lg:px-16">
      <Navbar />

      <div className="py-3 lg:py-8">
        <h1 className="text-2xl md:text-4xl font-medium mb-4">
          Recipe PDFs
        </h1>

        {/* Filter pills */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`py-2 px-6 rounded-full text-sm cursor-pointer transition-colors ${
                selectedFilter === filter
                  ? "bg-[#CE2425] text-white"
                  : "bg-[#F7F7F7] text-black hover:bg-gray-200"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="w-full h-px bg-gray-200 mb-6" />

        {loading ? (
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-16 bg-gray-100 rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : recipes.length === 0 ? (
          <p className="text-gray-500 text-center py-16">No recipes found.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {recipes.map((recipe) => (
              <a
                key={recipe.id}
                href={recipe.pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 px-4 py-4 hover:border-[#CE2425] hover:bg-red-50 transition-all group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <FaFilePdf
                    size={22}
                    className="shrink-0 text-[#CE2425]"
                  />
                  <span className="font-medium text-sm md:text-base text-gray-800 truncate group-hover:text-[#CE2425] transition-colors">
                    {recipe.title}
                  </span>
                </div>

                <span
                  className={`shrink-0 text-xs font-semibold px-3 py-1 rounded-full ${
                    recipe.category === "Veg"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-[#CE2425]"
                  }`}
                >
                  {recipe.category}
                </span>
              </a>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
