"use client";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i);

  const visiblePages = pages.filter((p) => {
    if (totalPages <= 5) return true;
    return p === 0 || p === totalPages - 1 || Math.abs(p - page) <= 1;
  });

  return (
    <div className="flex items-center justify-center gap-2 mt-10 flex-wrap">
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 0}
        aria-label="Previous page"
        className="flex items-center justify-center w-9 h-9 rounded-full bg-[#F7F7F7] text-gray-700 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <FiChevronLeft size={18} />
      </button>

      {visiblePages.map((p, index) => {
        const prev = visiblePages[index - 1];
        const showEllipsis = prev !== undefined && p - prev > 1;

        return (
          <span key={p} className="flex items-center gap-2">
            {showEllipsis && (
              <span className="text-gray-400 px-1 select-none">...</span>
            )}
            <button
              type="button"
              onClick={() => onPageChange(p)}
              className={`min-w-9 h-9 px-3 rounded-full text-sm font-medium transition-colors ${
                page === p
                  ? "bg-[#CE2425] text-white"
                  : "bg-[#F7F7F7] text-black hover:bg-gray-200"
              }`}
            >
              {p + 1}
            </button>
          </span>
        );
      })}

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages - 1}
        aria-label="Next page"
        className="flex items-center justify-center w-9 h-9 rounded-full bg-[#F7F7F7] text-gray-700 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <FiChevronRight size={18} />
      </button>
    </div>
  );
}
