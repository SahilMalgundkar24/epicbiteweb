import supabase from "@/lib/supabase";

export const RECIPES_PAGE_SIZE = 12;

export interface RecipeListItem {
  id: number;
  title: string;
  image_url: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface SubCategory {
  id: string;
  name: string;
  category_id: string;
}

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function parseCategoryId(value?: string | null): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  return UUID_REGEX.test(trimmed) ? trimmed : null;
}

export interface RecipesQueryResult {
  recipes: RecipeListItem[];
  totalCount: number;
}

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("id, name")
    .order("name");

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  return data ?? [];
}

export async function getSubCategories(
  categoryId: string,
): Promise<SubCategory[]> {
  const { data, error } = await supabase
    .from("subcategories")
    .select("id, name, category_id")
    .eq("category_id", categoryId)
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching subcategories:", error);
    return [];
  }

  return data ?? [];
}

export async function getRecipes({
  page = 0,
  categoryId,
  subCategoryName,
}: {
  page?: number;
  categoryId?: string | null;
  subCategoryName?: string | null;
}): Promise<RecipesQueryResult> {
  let query = supabase
    .from("recipes")
    .select("id, title, image_url", { count: "exact" });

  if (categoryId) {
    if (subCategoryName) {
      const { data: subCategoryData, error: subCategoryError } = await supabase
        .from("subcategories")
        .select("id")
        .eq("name", subCategoryName)
        .eq("category_id", categoryId)
        .single();

      if (subCategoryError) {
        console.error("Error fetching subcategory id:", subCategoryError);
      } else if (subCategoryData) {
        query = query.eq("subcategory_id", subCategoryData.id);
      }
    } else {
      query = query.eq("category_id", categoryId);
    }
  }

  const from = page * RECIPES_PAGE_SIZE;
  const to = from + RECIPES_PAGE_SIZE - 1;

  const { data, error, count } = await query.order("id").range(from, to);

  if (error) {
    console.error("Error fetching recipes:", error);
    return { recipes: [], totalCount: 0 };
  }

  return {
    recipes: data ?? [],
    totalCount: count ?? 0,
  };
}

export async function getPopularRecipes(
  categoryName = "All",
  limit = 5,
): Promise<RecipeListItem[]> {
  let query = supabase
    .from("recipes")
    .select("id, title, image_url")
    .limit(limit);

  if (categoryName !== "All") {
    const { data: categoryData, error: categoryError } = await supabase
      .from("categories")
      .select("id")
      .eq("name", categoryName)
      .single();

    if (categoryError) {
      console.error("Error fetching category:", categoryError);
      return [];
    }

    if (categoryData) {
      query = query.eq("category_id", categoryData.id);
    }
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching popular recipes:", error);
    return [];
  }

  return data ?? [];
}

export function buildRecipesUrl({
  page = 0,
  categoryId,
  subCategoryName,
}: {
  page?: number;
  categoryId?: string | null;
  subCategoryName?: string | null;
}) {
  const params = new URLSearchParams();

  if (page > 0) {
    params.set("page", String(page));
  }
  if (categoryId) {
    params.set("category", String(categoryId));
  }
  if (subCategoryName) {
    params.set("subcategory", subCategoryName);
  }

  const query = params.toString();
  return query ? `/recipes?${query}` : "/recipes";
}
