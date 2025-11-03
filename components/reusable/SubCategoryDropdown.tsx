"use client";

import React from "react";

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
  if (loading) return <p>Loading subcategories...</p>;
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
