import supabase from "@/lib/supabase";

export type PdfRecipeFilter = "All" | "Veg" | "Non-Veg";

export interface PdfRecipe {
  id: number;
  title: string;
  category: "Veg" | "Non-Veg";
  pdf_url: string;
  created_at: string;
}

export async function getPdfRecipes(
  filter: PdfRecipeFilter = "All",
): Promise<PdfRecipe[]> {
  let query = supabase
    .from("pdf_recipes")
    .select("id, title, category, pdf_url, created_at")
    .order("created_at", { ascending: false });

  if (filter !== "All") {
    query = query.eq("category", filter);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching pdf recipes:", error);
    return [];
  }

  return data ?? [];
}

export function buildPdfRecipesUrl(filter: PdfRecipeFilter) {
  if (filter === "All") return "/pdf-recipes";
  return `/pdf-recipes?filter=${encodeURIComponent(filter)}`;
}
