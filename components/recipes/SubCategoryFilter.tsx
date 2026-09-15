"use client";

import { useRouter } from "next/navigation";
import type { SubCategory } from "@/lib/recipes";
import { buildRecipesUrl } from "@/lib/recipes";

interface SubCategoryFilterProps {
  subCategories: SubCategory[];
  categoryId: string;
  selectedSubCategoryName?: string | null;
}

export default function SubCategoryFilter({
  subCategories,
  categoryId,
  selectedSubCategoryName = null,
}: SubCategoryFilterProps) {
  const router = useRouter();

  if (subCategories.length === 0) return null;

  return (
    <select
      value={selectedSubCategoryName || ""}
      onChange={(e) => {
        const value = e.target.value || null;
        router.push(
          buildRecipesUrl({
            page: 0,
            categoryId,
            subCategoryName: value,
          }),
        );
      }}
      className="bg-[#F7F7F7] text-black rounded-full py-2 px-6 text-sm cursor-pointer focus:outline-none"
    >
      <option value="">All Subcategories</option>
      {subCategories.map((sub) => (
        <option key={sub.id} value={sub.name}>
          {sub.name}
        </option>
      ))}
    </select>
  );
}
