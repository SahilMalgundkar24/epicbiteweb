import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaFilePdf } from "react-icons/fa6";
import {
  buildPdfRecipesUrl,
  getPdfRecipes,
  type PdfRecipeFilter,
} from "@/lib/pdf-recipes";

export const revalidate = 3600;

const filters: PdfRecipeFilter[] = ["All", "Veg", "Non-Veg"];

interface PdfRecipesPageProps {
  searchParams: Promise<{
    filter?: string;
  }>;
}

function parseFilter(value?: string): PdfRecipeFilter {
  if (value === "Veg" || value === "Non-Veg") return value;
  return "All";
}

export default async function PdfRecipesPage({ searchParams }: PdfRecipesPageProps) {
  const params = await searchParams;
  const selectedFilter = parseFilter(params.filter);
  const recipes = await getPdfRecipes(selectedFilter);

  return (
    <div className="px-5 md:px-10 lg:px-16">
      <Navbar />

      <div className="py-3 lg:py-8">
        <h1 className="text-2xl md:text-4xl font-medium mb-4">Recipe PDFs</h1>

        <div className="flex items-center gap-3 mb-6 flex-wrap">
          {filters.map((filter) => (
            <Link
              key={filter}
              href={buildPdfRecipesUrl(filter)}
              className={`py-2 px-6 rounded-full text-sm cursor-pointer transition-colors ${
                selectedFilter === filter
                  ? "bg-[#CE2425] text-white"
                  : "bg-[#F7F7F7] text-black hover:bg-gray-200"
              }`}
            >
              {filter}
            </Link>
          ))}
        </div>

        <div className="w-full h-px bg-gray-200 mb-6" />

        {recipes.length === 0 ? (
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
                  <FaFilePdf size={22} className="shrink-0 text-[#CE2425]" />
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
