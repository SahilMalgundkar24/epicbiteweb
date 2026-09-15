"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import supabase from "@/lib/supabase";
import NavLink from "@/components/reusable/NavLink";
import LoadingSpinner from "@/components/reusable/LoadingSpinner";
import { useRecipeNavigation } from "@/hooks/useRecipeNavigation";

interface Recipe {
  id: number;
  title: string;
  image_url: string;
}

const Navbar = () => {
  const { navigateToRecipe } = useRecipeNavigation();

  const handleSelectRecipe = (id: number) => {
    setShowMobileSearch(false);
    setSearchQuery("");
    setSearchResults([]);
    document.body.style.overflow = "auto";
    navigateToRecipe(id);
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const [searchResults, setSearchResults] = useState<Recipe[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const openMobileSearch = () => setShowMobileSearch(true);
  const closeMobileSearch = () => {
    setShowMobileSearch(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedQuery.trim().length > 0) {
      handleSearch(debouncedQuery);
      setShowModal(true);
    } else {
      setShowModal(false);
      setSearchResults([]);
    }
  }, [debouncedQuery]);

  useEffect(() => {
    if (showMobileSearch) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showMobileSearch]);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim().length === 0) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    try {
      const { data, error } = await supabase
        .from("recipes")
        .select("id, title, image_url")
        .ilike("title", `%${query}%`)
        .limit(7);

      if (error) {
        console.log("Search failed (might be offline):", error.message);
        setSearchResults([]);
        return;
      }

      setSearchResults(data || []);
    } catch (error) {
      console.log("Search failed silently:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const toggleMobileMenu = () => {
    if (isMobileMenuOpen) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsMobileMenuOpen(false);
        setIsAnimating(false);
      }, 400);
    } else {
      setIsMobileMenuOpen(true);
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsAnimating(false);
  };

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="py-3 lg:py-2">
      <div className="flex items-center justify-between">
        <div className="w-auto md:w-1/3">
          <NavLink href="/">
            <Image
              src="/images/epicbitelogo.svg"
              alt="Logo"
              width={140}
              height={48}
              className="h-12 w-auto"
              priority
            />
          </NavLink>
        </div>

        <div className="hidden md:flex w-1/3 justify-center items-center gap-7">
          <NavLink
            href="/"
            className="text-sm hover:text-[#CE2425] cursor-pointer transition-colors"
          >
            Home
          </NavLink>
          <NavLink
            href="/recipes"
            className="text-sm hover:text-[#CE2425] cursor-pointer transition-colors"
          >
            Explore
          </NavLink>
          <NavLink
            href="/pdf-recipes"
            className="text-sm hover:text-[#CE2425] cursor-pointer transition-colors"
          >
            More Recipes
          </NavLink>
          <NavLink
            href="/about"
            className="text-sm hover:text-[#CE2425] cursor-pointer transition-colors"
          >
            About
          </NavLink>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={openMobileSearch}
            className="p-2 bg-[#F7F7F7] rounded-full"
          >
            <FiSearch color="#9B9B9B" size={18} />
          </button>

          <button
            onClick={toggleMobileMenu}
            className="p-2 text-gray-600 hover:text-[#CE2425] transition-colors"
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        <div className="hidden md:flex w-1/3 items-center justify-end relative">
          <div className="flex items-center bg-[#F7F7F7] px-7 rounded-full w-full">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleInputChange}
              className="py-2 bg-transparent rounded-full placeholder-[#9B9B9B] focus:outline-none w-full"
            />
            <span className="text-gray-500 pointer-events-none ml-2">
              <FiSearch color="#9B9B9B" />
            </span>
          </div>

          {showModal && (
            <div className="absolute top-12 right-0 w-full bg-white shadow-xl rounded-xl p-4 z-50 max-h-80 overflow-y-auto">
              {isSearching && (
                <div className="py-6">
                  <LoadingSpinner size={20} label="Searching" />
                </div>
              )}

              {!isSearching &&
                searchResults.length === 0 &&
                debouncedQuery.length > 0 && (
                  <p className="text-gray-500 text-sm text-center">
                    No results found
                  </p>
                )}

              {!isSearching &&
                searchResults.map((recipe) => (
                  <div
                    key={recipe.id}
                    className="flex items-center gap-4 p-2 cursor-pointer hover:bg-gray-100 rounded-lg"
                    onClick={() => handleSelectRecipe(recipe.id)}
                  >
                    <Image
                      src={recipe.image_url}
                      alt={recipe.title}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-md object-cover shrink-0"
                    />
                    <span className="text-black font-medium">
                      {recipe.title}
                    </span>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className={`md:hidden px-10 absolute top-16 left-0 right-0 bg-white/40 backdrop-blur-lg z-50 rounded-b-xl h-full
          ${
            isMobileMenuOpen && !isAnimating
              ? "animate-slideDown"
              : "animate-slideUp"
          }`}
        >
          <div className="flex flex-col items-center py-4 space-y-4">
            <NavLink
              href="/"
              onClick={closeMobileMenu}
              className="hover:text-[#CE2425] cursor-pointer transition-colors py-2"
            >
              Home
            </NavLink>
            <NavLink
              href="/recipes"
              onClick={closeMobileMenu}
              className="hover:text-[#CE2425] cursor-pointer transition-colors py-2"
            >
              Explore
            </NavLink>
            <NavLink
              href="/pdf-recipes"
              onClick={closeMobileMenu}
              className="hover:text-[#CE2425] cursor-pointer transition-colors py-2"
            >
              More Recipes
            </NavLink>
            <NavLink
              href="/about"
              onClick={closeMobileMenu}
              className="hover:text-[#CE2425] cursor-pointer transition-colors py-2"
            >
              About
            </NavLink>
          </div>
        </div>
      )}

      {showMobileSearch && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-start pt-20 px-4">
          <div className="bg-white w-full max-w-md rounded-xl pt-10 px-4 shadow-xl relative">
            <button
              onClick={closeMobileSearch}
              className="absolute top-3 right-4 text-gray-500 hover:text-black"
            >
              <FiX size={22} />
            </button>

            <div className="flex items-center gap-3 bg-[#F7F7F7] px-4 py-2 rounded-full">
              <FiSearch color="#9B9B9B" size={18} />
              <input
                type="text"
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent w-full focus:outline-none"
              />
            </div>

            <div className="mt-4 max-h-80 overflow-y-auto">
              {isSearching && (
                <div className="py-6">
                  <LoadingSpinner size={20} label="Searching" />
                </div>
              )}

              {!isSearching &&
                searchResults.length === 0 &&
                searchQuery.trim() !== "" && (
                  <p className="text-gray-500 text-sm text-center">
                    No results found
                  </p>
                )}

              {!isSearching &&
                searchResults.map((recipe) => (
                  <div
                    key={recipe.id}
                    className="flex items-center gap-4 p-2 cursor-pointer hover:bg-gray-100 rounded-lg"
                    onClick={() => handleSelectRecipe(recipe.id)}
                  >
                    <Image
                      src={recipe.image_url}
                      alt={recipe.title}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-md object-cover shrink-0"
                    />
                    <span className="text-black font-medium">
                      {recipe.title}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
