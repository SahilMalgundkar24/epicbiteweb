"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleMobileMenu = () => {
    if (isMobileMenuOpen) {
      // Trigger close animation
      setIsAnimating(true);
      setTimeout(() => {
        setIsMobileMenuOpen(false);
        setIsAnimating(false);
      }, 400); // match animation duration
    } else {
      setIsMobileMenuOpen(true);
    }
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
          <Link href="/">
            <img src="/images/logo.png" alt="Logo" className="h-12 md:h-auto" />
          </Link>
        </div>

        <div className="hidden md:flex w-1/3 justify-center items-center gap-7">
          <Link
            href="/"
            className="text-sm hover:text-[#CE2425] cursor-pointer transition-colors"
          >
            Home
          </Link>
          <Link
            href="/recipes"
            className="text-sm hover:text-[#CE2425] cursor-pointer transition-colors"
          >
            Explore
          </Link>
          <h1 className="text-sm hover:text-[#CE2425] cursor-pointer transition-colors">
            About
          </h1>
          <h1 className="text-sm hover:text-[#CE2425] cursor-pointer transition-colors">
            Contact
          </h1>
        </div>

        <div className="hidden md:flex w-1/3 items-center justify-end">
          <div className="flex items-center bg-[#F7F7F7] px-7 rounded-full">
            <input
              type="text"
              placeholder="Search"
              className="py-2 bg-transparent rounded-full placeholder-[#9B9B9B] focus:outline-none w-full"
            />
            <span className="text-gray-500 pointer-events-none ml-2">
              <FiSearch color="#9B9B9B" />
            </span>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          <div className="p-2 bg-[#F7F7F7] rounded-full">
            <FiSearch color="#9B9B9B" size={18} />
          </div>
          <button
            onClick={toggleMobileMenu}
            className="p-2 text-gray-600 hover:text-[#CE2425] transition-colors"
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
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
            <h1 className=" hover:text-[#CE2425] cursor-pointer transition-colors py-2">
              Home
            </h1>
            <h1 className=" hover:text-[#CE2425] cursor-pointer transition-colors py-2">
              Explore
            </h1>
            <h1 className=" hover:text-[#CE2425] cursor-pointer transition-colors py-2">
              About
            </h1>
            <h1 className=" hover:text-[#CE2425] cursor-pointer transition-colors py-2">
              Contact
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
