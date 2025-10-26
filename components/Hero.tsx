import React from "react";
import { GoArrowUpRight } from "react-icons/go";
import { FiDownload } from "react-icons/fi";

const Hero = () => {
  return (
    <>
      <div className="w-full h-96 md:h-96 px-6 md:px-12 py-6 md:py-10 bg-[#F7F7F7] rounded-lg flex flex-col md:flex-row md:justify-between items-center relative overflow-hidden">
        <div className="w-full md:w-1/2 flex flex-col justify-between h-full z-10">
          <div>
            <h1 className="text-3xl md:text-5xl font-semibold leading-[1.1]">
              Your Kitchen,
              <br />
              Your
              <span className="text-[#CE2425]"> Next Recipe</span>
            </h1>
            <h1 className="text-[#6E6E6E] mt-2 text-sm md:text-base">
              Discover a collection of simple, flavorful recipes designed to
              make everyday cooking easy, enjoyable, and stress-free
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 md:gap-7 mt-6 md:mt-0">
            <div className="bg-black rounded-full px-3 py-2 text-white text-sm flex items-center gap-3 justify-center sm:justify-start">
              <h1 className="ml-2">Explore Recipes</h1>
              <div className="bg-white h-7 w-7 rounded-full flex justify-center items-center p-1">
                <GoArrowUpRight color="#000" size="20" />
              </div>
            </div>

            <div className="bg-white border border-[#DADADA] rounded-full px-3 py-2 text-sm flex items-center gap-3 justify-center sm:justify-start">
              <h1 className="ml-2">Get Android App</h1>
              <div className="bg-white h-7 w-7 rounded-full flex justify-center items-center">
                <FiDownload size="20" color="#212121" />
              </div>
            </div>
          </div>
        </div>

        {/* Image positioned absolutely to prevent container growth */}
        <div className="absolute right-6 md:right-25 top-1/2 transform -translate-y-1/2 opacity-30 md:opacity-100">
          <img
            src="/images/image.png"
            alt="Hero food image"
            className="w-60 h-60 md:w-120 md:h-120 object-cover"
          />
        </div>
      </div>
    </>
  );
};

export default Hero;
