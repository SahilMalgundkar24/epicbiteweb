/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import Categories from "@/components/reusable/Categories";
import SubCategoryDropdown from "@/components/reusable/SubCategoryDropdown";
import supabase from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Footer from "@/components/Footer";
import { FaFilePdf } from "react-icons/fa6";

interface Recipe {
  id: number;
  title: string;
  image_url: string;
}

interface Category {
  id: number;
  name: string;
}

interface SubCategory {
  id: number;
  name: string;
  category_id: number;
}

export default function RecipesPage() {
  const router = useRouter();

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>({
    id: 0,
    name: "All",
  });

  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [loadingSubCategories, setLoadingSubCategories] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null,
  );

  const fetchSubCategories = async (categoryId: number) => {
    setLoadingSubCategories(true);
    try {
      const { data, error } = await supabase
        .from("subcategories")
        .select("id, name, category_id")
        .eq("category_id", categoryId)
        .order("name", { ascending: true });

      if (error) {
        console.error("Error fetching subcategories:", error);
        setSubCategories([]);
        return;
      }
      setSubCategories(data || []);
    } catch (error) {
      console.error("Error:", error);
      setSubCategories([]);
    } finally {
      setLoadingSubCategories(false);
    }
  };

  const fetchRecipes = async () => {
    setLoading(true);
    let query = supabase.from("recipes").select("id, title, image_url");

    if (selectedCategory && selectedCategory.name !== "All") {
      if (selectedSubCategory) {
        // Need to get subcategory ID
        const { data: subCategoryData, error: subCategoryError } =
          await supabase
            .from("subcategories")
            .select("id")
            .eq("name", selectedSubCategory)
            .eq("category_id", selectedCategory.id)
            .single();

        if (subCategoryError) {
          console.error("Error fetching subcategory id:", subCategoryError);
        } else {
          query = query.eq("subcategory_id", subCategoryData.id);
        }
      } else {
        query = query.eq("category_id", selectedCategory.id);
      }
    }

    const { data, error } = await query.order("id");

    if (error) {
      console.error("Error fetching recipes:", error);
      setRecipes([]);
    } else {
      setRecipes(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRecipes();
  }, [selectedCategory, selectedSubCategory]);

  useEffect(() => {
    if (selectedCategory && selectedCategory.name !== "All") {
      fetchSubCategories(selectedCategory.id);
    } else {
      setSubCategories([]);
    }
    setSelectedSubCategory(null);
  }, [selectedCategory]);

  return (
    <div className="px-5 md:px-10 lg:px-16">
      <Navbar />
      <div className="py-3 lg:py-8">
        <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
          <h1 className="text-2xl md:text-4xl font-medium">Explore Recipes</h1>
          <Link
            href="/pdf-recipes"
            className="flex items-center gap-2 bg-[#F7F7F7] hover:bg-red-50 hover:border-[#CE2425] border border-transparent text-sm font-medium px-4 py-2 rounded-full transition-all text-gray-700 hover:text-[#CE2425] shrink-0"
          >
            <FaFilePdf size={15} className="text-[#CE2425]" />
            Recipe PDFs
          </Link>
        </div>
        <div className="mb-5">
          <Categories
            type="allrecipe"
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>

        <div className="mb-5">
          {subCategories.length > 0 && (
            <SubCategoryDropdown
              subCategories={subCategories}
              selectedSubCategory={selectedSubCategory}
              setSelectedSubCategory={setSelectedSubCategory}
              loading={loadingSubCategories}
            />
          )}
        </div>

        {loading ? (
          <p>Loading recipes...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-8">
            {recipes.map((recipe) => (
              <div
                onClick={() => router.push(`recipes/${recipe.id}`)}
                key={recipe.id}
                className="w-full shrink-0 select-none cursor-pointer"
              >
                <img
                  src={recipe.image_url}
                  alt={recipe.title}
                  className="w-full h-64 lg:h-80 bg-gray-200 rounded-lg object-cover pointer-events-none"
                />
                <h1 className="text-base lg:text-lg font-semibold">
                  {recipe.title}
                </h1>
                <h1 className="text-xs lg:text-sm text-black/50">
                  by Sadika Inamdar
                </h1>
              </div>
            ))}
            {recipes.length === 0 && <p>No recipes found.</p>}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
