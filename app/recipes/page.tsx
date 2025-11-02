/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import Categories from "@/components/reusable/Categories";
import SubCategoryDropdown from "@/components/reusable/SubCategoryDropdown";
import supabase from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

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
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [loadingSubCategories, setLoadingSubCategories] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null
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
    setSelectedSubCategory(null); // Reset subcategory when category changes
  }, [selectedCategory]);

  return (
    <div className="px-5 md:px-10 lg:px-16">
      <Navbar />
      <div className="py-8">
        <h1 className="text-3xl md:text-5xl font-semibold mb-4">
          Explore Recipes
        </h1>
        <div className="flex justify-between items-center mb-8">
          <Categories
            type="allrecipe"
            selectedCategory={selectedCategory?.name || "All"}
            setSelectedCategory={(category) =>
              setSelectedCategory(category as Category)
            }
          />
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {recipes.map((recipe) => (
              <button
                onClick={() => router.push(`recipes/${recipe.id}`)}
                key={recipe.id}
                className="bg-white rounded-lg shadow-md cursor-pointer"
              >
                <img
                  src={recipe.image_url}
                  alt={recipe.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h2 className="font-semibold text-lg">{recipe.title}</h2>
                </div>
              </button>
            ))}
            {recipes.length === 0 && <p>No recipes found.</p>}
          </div>
        )}
      </div>
    </div>
  );
}
