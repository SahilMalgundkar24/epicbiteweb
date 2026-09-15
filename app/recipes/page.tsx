import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NavLink from "@/components/reusable/NavLink";
import CategoryFilterLinks from "@/components/recipes/CategoryFilterLinks";
import SubCategoryFilter from "@/components/recipes/SubCategoryFilter";
import RecipeGrid from "@/components/recipes/RecipeGrid";
import RecipesPaginationLinks from "@/components/recipes/RecipesPaginationLinks";
import {
  RECIPES_PAGE_SIZE,
  getCategories,
  getRecipes,
  getSubCategories,
  parseCategoryId,
} from "@/lib/recipes";
import { FaFilePdf } from "react-icons/fa6";

export const revalidate = 3600;

interface RecipesPageProps {
  searchParams: Promise<{
    page?: string;
    category?: string;
    subcategory?: string;
  }>;
}

export default async function RecipesPage({ searchParams }: RecipesPageProps) {
  const params = await searchParams;
  const page = Math.max(0, parseInt(params.page ?? "0", 10) || 0);
  const validCategoryId = parseCategoryId(params.category);
  const subCategoryName = params.subcategory?.trim() || null;

  const [categories, subCategories, { recipes, totalCount }] = await Promise.all([
    getCategories(),
    validCategoryId ? getSubCategories(validCategoryId) : Promise.resolve([]),
    getRecipes({
      page,
      categoryId: validCategoryId,
      subCategoryName,
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalCount / RECIPES_PAGE_SIZE));

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
          <CategoryFilterLinks
            categories={categories}
            selectedCategoryId={validCategoryId}
          />
        </div>

        {validCategoryId && subCategories.length > 0 && (
          <div className="mb-5">
            <SubCategoryFilter
              subCategories={subCategories}
              categoryId={validCategoryId}
              selectedSubCategoryName={subCategoryName}
            />
          </div>
        )}

        <RecipeGrid recipes={recipes} />

        <RecipesPaginationLinks
          page={page}
          totalPages={totalPages}
          categoryId={validCategoryId}
          subCategoryName={subCategoryName}
        />
      </div>
      <Footer />
    </div>
  );
}
