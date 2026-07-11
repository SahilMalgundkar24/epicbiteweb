"use client";

import { GoArrowUpRight } from "react-icons/go";
import NavLink from "@/components/reusable/NavLink";

export default function ExploreRecipesLink() {
  return (
    <NavLink
      href="/recipes"
      className="bg-[#CE2425] rounded-full px-3 py-2 text-white text-sm flex items-center gap-3 justify-center sm:justify-start"
    >
      <span className="ml-2">Explore Recipes</span>
      <div className="bg-white h-7 w-7 rounded-full flex justify-center items-center p-1">
        <GoArrowUpRight color="#000" size="20" />
      </div>
    </NavLink>
  );
}
