import React from "react";
import { GoArrowUpRight } from "react-icons/go";
import { FiDownload } from "react-icons/fi";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="relative w-full flex flex-col items-center justify-center h-full overflow-hidden">
      {/* ===== Top Decorative Elements ===== */}
      <img
        src="/images/herobg1.png"
        alt=""
        className="hidden lg:block absolute top-6 left-10 w-32 md:w-40 opacity-90"
      />
      <img
        src="/images/herobg2.png"
        alt=""
        className="hidden lg:block absolute top-32 right-16 w-32 md:w-40 opacity-90"
      />

      <img
        src="/images/herobg4.png"
        alt=""
        className="hidden lg:block absolute top-0 right-1/4 w-32 md:w-48 opacity-80"
      />
      <img
        src="/images/herobg5.png"
        alt=""
        className="hidden lg:block absolute top-24 left-1/4 w-32 md:w-48 opacity-80"
      />

      {/* ===== User Badge Section ===== */}
      <div className="mt-12 w-full flex justify-center items-center mb-3 z-10">
        <div className="px-3 py-1 border border-gray-300 rounded-full flex items-center gap-2 bg-white/70 backdrop-blur-sm">
          <div className="flex -space-x-2">
            <img
              src="/images/user1.png"
              alt="User 1"
              className="w-6 h-6 rounded-full border-2 border-white object-cover"
            />
            <img
              src="/images/user2.png"
              alt="User 2"
              className="w-6 h-6 rounded-full border-2 border-white object-cover"
            />
            <img
              src="/images/user3.png"
              alt="User 3"
              className="w-6 h-6 rounded-full border-2 border-white object-cover"
            />
          </div>
          <h1 className="text-xs font-medium text-gray-700">
            Loved by 8k+ users
          </h1>
        </div>
      </div>

      {/* ===== Title & Description ===== */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-medium leading-[1.1]">
          Your Kitchen, <br />
          Your <span className="text-[#CE2425]">Next Recipe</span>
        </h1>
        <p className="text-[#6E6E6E] mt-2 text-sm md:text-base max-w-2xl mx-auto">
          Discover a collection of simple, flavorful recipes designed to make
          everyday cooking easy, enjoyable, and stress-free.
        </p>
      </div>

      {/* ===== Mid Decorative Elements (around text/buttons) ===== */}
      <img
        src="/images/herobg6.png"
        alt=""
        className="hidden lg:block absolute top-[35%] left-10 w-32 md:w-40 opacity-80"
      />
      <img
        src="/images/herobg7.png"
        alt=""
        className="hidden lg:block absolute top-[35%] right-12 w-32 md:w-40 opacity-80"
      />
      <img
        src="/images/herobg2.png"
        alt=""
        className="hidden lg:block absolute top-[50%] left-[20%] w-32 md:w-40 opacity-60"
      />
      <img
        src="/images/herobg3.png"
        alt=""
        className="hidden lg:block absolute top-[50%] right-[15%] w-32 md:w-40 opacity-70"
      />

      {/* ===== Buttons ===== */}
      <div className="flex flex-col sm:flex-row gap-4 md:gap-7 mt-6 z-10">
        <Link
          href="/recipes"
          className="bg-[#CE2425] rounded-full px-3 py-2 text-white text-sm flex items-center gap-3 justify-center sm:justify-start"
        >
          <h1 className="ml-2">Explore Recipes</h1>
          <div className="bg-white h-7 w-7 rounded-full flex justify-center items-center p-1">
            <GoArrowUpRight color="#000" size="20" />
          </div>
        </Link>

        <div className="bg-white border border-[#DADADA] rounded-full px-3 py-2 text-sm flex items-center gap-3 justify-center sm:justify-start">
          <h1 className="ml-2">Get Android App</h1>
          <div className="bg-white h-7 w-7 rounded-full flex justify-center items-center">
            <FiDownload size="20" color="#212121" />
          </div>
        </div>
      </div>

      {/* ===== Hero Main Image Section ===== */}
      <div className="relative flex justify-center w-full mt-12 z-10">
        <img
          src="/images/Ellipse.png"
          alt="Hero ellipse"
          className="w-96 lg:w-132 h-96 lg:h-132 object-cover"
        />
        <img
          src="/images/image.png"
          alt="Hero food image"
          className="absolute top-1/2 left-1/2 w-96 lg:w-132 h-96 lg:h-132 object-cover -translate-x-1/2 -translate-y-1/2"
        />

        {/* ===== Bottom Decorative Elements ===== */}
        <img
          src="/images/herobg1.png"
          alt=""
          className="hidden lg:block absolute bottom-12 left-12 w-32 md:w-40 opacity-90"
        />
        <img
          src="/images/herobg4.png"
          alt=""
          className="hidden lg:block absolute bottom-16 right-20 w-32 md:w-40 opacity-90"
        />
        <img
          src="/images/herobg5.png"
          alt=""
          className="hidden lg:block absolute bottom-8 left-1/2 w-32 md:w-40 -translate-x-1/2 opacity-80"
        />
        <img
          src="/images/herobg6.png"
          alt=""
          className="hidden lg:block absolute bottom-0 right-1/3 w-32 md:w-40 opacity-80"
        />
        <img
          src="/images/herobg7.png"
          alt=""
          className="hidden lg:block absolute bottom-4 left-1/4 w-32 md:w-40 opacity-90"
        />
      </div>
    </div>
  );
};

export default Hero;
