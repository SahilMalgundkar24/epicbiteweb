"use client";
import { useState, useEffect, useCallback } from "react";
import { FiLoader } from "react-icons/fi";
import Categories from "@/components/reusable/Categories";
import SubCategoryDropdown from "@/components/reusable/SubCategoryDropdown";
import Pagination from "@/components/reusable/Pagination";
import supabase from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import NavLink from "@/components/reusable/NavLink";
import Footer from "@/components/Footer";
import RecipeGridSkeleton from "@/components/reusable/RecipeGridSkeleton";
import RecipeImage from "@/components/reusable/RecipeImage";
import { useRecipeNavigation } from "@/hooks/useRecipeNavigation";
import { FaFilePdf } from "react-icons/fa6";

const PAGE_SIZE = 12;

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
  const { navigateToRecipe, isNavigating, navigatingTo } =
    useRecipeNavigation();

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>({
    id: 0,
    name: "All",
  });

  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [loadingSubCategories, setLoadingSubCategories] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null,
  );

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

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

  const fetchRecipes = useCallback(async () => {
    setLoading(true);

    let query = supabase
      .from("recipes")
      .select("id, title, image_url", { count: "exact" });

    if (selectedCategory && selectedCategory.name !== "All") {
      if (selectedSubCategory) {
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

    const from = page * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const { data, error, count } = await query
      .order("id")
      .range(from, to);

    if (error) {
      console.error("Error fetching recipes:", error);
      setRecipes([]);
      setTotalCount(0);
    } else {
      setRecipes(data || []);
      setTotalCount(count ?? 0);
    }
    setLoading(false);
  }, [selectedCategory, selectedSubCategory, page]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  const handleCategoryChange = (category: Category | null) => {
    setPage(0);
    setSelectedCategory(category);
  };

  const handleSubCategoryChange = (subCategory: string | null) => {
    setPage(0);
    setSelectedSubCategory(subCategory);
  };

  useEffect(() => {
    if (selectedCategory && selectedCategory.name !== "All") {
      fetchSubCategories(selectedCategory.id);
    } else {
      setSubCategories([]);
    }
    setSelectedSubCategory(null);
  }, [selectedCategory]);

  const handleRecipeClick = (id: number) => {
    if (isNavigating) return;
    navigateToRecipe(id);
  };

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="px-5 md:px-10 lg:px-16">
      <Navbar />
      <div className="py-3 lg:py-8">
        <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
          <h1 className="text-2xl md:text-4xl font-medium">Explore Recipes</h1>
          <NavLink
            href="/pdf-recipes"
            className="flex items-center gap-2 bg-[#F7F7F7] hover:bg-red-50 hover:border-[#CE2425] border border-transparent text-sm font-medium px-4 py-2 rounded-full transition-all text-gray-700 hover:text-[#CE2425] shrink-0"
          >
            <FaFilePdf size={15} className="text-[#CE2425]" />
            Recipe PDFs
          </NavLink>
        </div>
        <div className="mb-5">
          <Categories
            type="allrecipe"
            selectedCategory={selectedCategory}
            setSelectedCategory={handleCategoryChange}
          />
        </div>

        <div className="mb-5">
          {subCategories.length > 0 && (
            <SubCategoryDropdown
              subCategories={subCategories}
              selectedSubCategory={selectedSubCategory}
              setSelectedSubCategory={handleSubCategoryChange}
              loading={loadingSubCategories}
            />
          )}
        </div>

        {loading ? (
          <RecipeGridSkeleton count={8} />
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-8">
              {recipes.map((recipe) => {
                const isLoadingThis = navigatingTo === recipe.id;

                return (
                  <div
                    onClick={() => handleRecipeClick(recipe.id)}
                    key={recipe.id}
                    className={`w-full shrink-0 select-none cursor-pointer relative ${
                      isLoadingThis ? "pointer-events-none" : ""
                    }`}
                  >
                    <div className="relative">
                      <RecipeImage
                        src={recipe.image_url}
                        alt={recipe.title}
                        imageClassName={`rounded-lg object-cover bg-gray-200 pointer-events-none transition-opacity ${
                          isLoadingThis ? "opacity-50" : ""
                        }`}
                      />
                      {isLoadingThis && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <FiLoader
                            size={28}
                            className="animate-spin text-[#CE2425]"
                          />
                        </div>
                      )}
                    </div>
                    <h1 className="text-base lg:text-lg font-semibold">
                      {recipe.title}
                    </h1>
                    <h1 className="text-xs lg:text-sm text-black/50">
                      by Sadika Inamdar
                    </h1>
                  </div>
                );
              })}
              {recipes.length === 0 && <p>No recipes found.</p>}
            </div>

            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
