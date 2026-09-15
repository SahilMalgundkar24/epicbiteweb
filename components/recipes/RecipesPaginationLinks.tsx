import Link from "next/link";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { buildRecipesUrl } from "@/lib/recipes";

interface RecipesPaginationLinksProps {
  page: number;
  totalPages: number;
  categoryId?: string | null;
  subCategoryName?: string | null;
}

export default function RecipesPaginationLinks({
  page,
  totalPages,
  categoryId = null,
  subCategoryName = null,
}: RecipesPaginationLinksProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i);

  const visiblePages = pages.filter((p) => {
    if (totalPages <= 5) return true;
    return p === 0 || p === totalPages - 1 || Math.abs(p - page) <= 1;
  });

  const hrefForPage = (targetPage: number) =>
    buildRecipesUrl({
      page: targetPage,
      categoryId,
      subCategoryName,
    });

  return (
    <div className="flex items-center justify-center gap-2 mt-10 flex-wrap">
      {page === 0 ? (
        <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#F7F7F7] text-gray-400 opacity-40">
          <FiChevronLeft size={18} />
        </span>
      ) : (
        <Link
          href={hrefForPage(page - 1)}
          aria-label="Previous page"
          className="flex items-center justify-center w-9 h-9 rounded-full bg-[#F7F7F7] text-gray-700 hover:bg-gray-200 transition-colors"
        >
          <FiChevronLeft size={18} />
        </Link>
      )}

      {visiblePages.map((p, index) => {
        const prev = visiblePages[index - 1];
        const showEllipsis = prev !== undefined && p - prev > 1;

        return (
          <span key={p} className="flex items-center gap-2">
            {showEllipsis && (
              <span className="text-gray-400 px-1 select-none">...</span>
            )}
            <Link
              href={hrefForPage(p)}
              className={`min-w-9 h-9 px-3 rounded-full text-sm font-medium transition-colors inline-flex items-center justify-center ${
                page === p
                  ? "bg-[#CE2425] text-white"
                  : "bg-[#F7F7F7] text-black hover:bg-gray-200"
              }`}
            >
              {p + 1}
            </Link>
          </span>
        );
      })}

      {page >= totalPages - 1 ? (
        <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#F7F7F7] text-gray-400 opacity-40">
          <FiChevronRight size={18} />
        </span>
      ) : (
        <Link
          href={hrefForPage(page + 1)}
          aria-label="Next page"
          className="flex items-center justify-center w-9 h-9 rounded-full bg-[#F7F7F7] text-gray-700 hover:bg-gray-200 transition-colors"
        >
          <FiChevronRight size={18} />
        </Link>
      )}
    </div>
  );
}
