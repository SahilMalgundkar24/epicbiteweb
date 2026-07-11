"use client";

import React from "react";
import LoadingSpinner from "./LoadingSpinner";

interface SubCategory {
  id: number;
  name: string;
}

interface SubCategoryDropdownProps {
  subCategories: SubCategory[];
  selectedSubCategory: string | null;
  setSelectedSubCategory: (name: string | null) => void;
  loading: boolean;
}

const SubCategoryDropdown: React.FC<SubCategoryDropdownProps> = ({
  subCategories,
  selectedSubCategory,
  setSelectedSubCategory,
  loading,
}) => {
  if (loading) {
    return (
      <div className="flex items-center gap-3">
        <div className="h-9 w-44 bg-gray-200 rounded-full animate-pulse" />
        <LoadingSpinner size={18} />
      </div>
    );
  }

  if (subCategories.length === 0) return null;

  return (
    <select
      value={selectedSubCategory || ""}
      onChange={(e) =>
        setSelectedSubCategory(e.target.value ? e.target.value : null)
      }
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
};

export default SubCategoryDropdown;
