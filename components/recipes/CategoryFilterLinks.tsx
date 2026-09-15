import Link from "next/link";
import type { Category } from "@/lib/recipes";
import { buildRecipesUrl } from "@/lib/recipes";

interface CategoryFilterLinksProps {
  categories: Category[];
  selectedCategoryId?: string | null;
}

export default function CategoryFilterLinks({
  categories,
  selectedCategoryId = null,
}: CategoryFilterLinksProps) {
  const isAllSelected = !selectedCategoryId;

  return (
    <div className="flex flex-row justify-between overflow-x-scroll scrollbar-hide">
      <div className="flex items-center gap-4 whitespace-nowrap">
        <Link
          href={buildRecipesUrl({
            page: 0,
            subCategoryName: null,
          })}
          className={`py-2 px-6 rounded-full text-sm cursor-pointer ${
            isAllSelected
              ? "bg-[#CE2425] text-white"
              : "bg-[#F7F7F7] text-black hover:bg-gray-200"
          }`}
        >
          All
        </Link>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={buildRecipesUrl({
              page: 0,
              categoryId: category.id,
              subCategoryName: null,
            })}
            className={`py-2 px-6 rounded-full text-sm cursor-pointer ${
              selectedCategoryId === category.id
                ? "bg-[#CE2425] text-white"
                : "bg-[#F7F7F7] text-black hover:bg-gray-200"
            }`}
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
