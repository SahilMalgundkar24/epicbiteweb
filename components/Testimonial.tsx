import React from "react";
import { FaRegHeart, FaTrophy } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { MdLiveTv } from "react-icons/md";
import { IoIosRestaurant } from "react-icons/io";

const Testimonial = () => {
  return (
    <>
      <div className="py-8 md:py-16">
        <h1 className="text-2xl md:text-4xl font-semibold text-center">
          Your journey to <span className="text-[#CE2425]">Better Cooking</span>
          <br className="hidden md:flex"></br> starts here
        </h1>

        <h1 className="text-center text-[#6E6E6E] text-sm md:text-base mt-2">
          Simple, delicious recipes that teach as they taste.
        </h1>

        <div className="w-full flex flex-col lg:flex-row justify-between items-stretch lg:items-end gap-4 md:gap-7 mt-5">
          <div
            className="w-full lg:w-1/4 h-48 md:h-72 rounded-lg flex flex-col justify-end p-4 md:p-5"
            style={{
              backgroundImage: "url(/images/stats.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="bg-white/60 backdrop-blur-sm rounded-full px-4 md:px-6 py-2 font-medium self-start text-sm md:text-base">
              Easy to follow
            </div>
          </div>

          {/* Testimonial Card */}
          <div className="w-full lg:w-1/4 h-48 bg-[#E64041] rounded-lg relative p-4 flex flex-col justify-end">
            <div>
              <h1 className="text-xl md:text-2xl text-white font-semibold leading-tight">
                Cooking has never been this easy!
              </h1>
            </div>
          </div>

          {/* Video Card */}
          <div className="relative w-full lg:w-1/4 h-96 rounded-lg overflow-hidden">
            {/* Background Video */}
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src="/video.mp4"
              autoPlay
              loop
              muted
              playsInline
            ></video>

            {/* Overlay for optional dark tint (optional) */}
            <div className="absolute inset-0 bg-black/10"></div>

            {/* Text on top */}
            <div className="relative z-10 flex flex-col items-start justify-end h-full text-white p-4">
              <h2 className="text-white text-2xl font-bold tracking-wider">
                Cook with
                <br />
                Master Chefs
              </h2>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="w-full lg:w-1/4 rounded-lg flex flex-col gap-2 justify-end">
            <div className="bg-gray-200 w-full h-14 md:h-16 rounded-md flex items-center px-3 md:px-4 gap-3">
              <div className="w-7 h-7 md:w-8 md:h-8 bg-red-100 rounded-full flex items-center justify-center">
                <FaTrophy className="text-red-600 w-4 h-4 md:w-5 md:h-5" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-gray-800 font-semibold text-xs md:text-sm">
                  2time IFFBA AWARDS in 2022 And 2024
                </h3>
              </div>
            </div>

            <div className="bg-gray-200 w-full h-14 md:h-16 rounded-md flex items-center px-3 md:px-4 gap-3">
              <div className="w-7 h-7 md:w-8 md:h-8 bg-red-100 rounded-full flex items-center justify-center">
                <MdLiveTv className="text-red-600 w-4 h-4 md:w-5 md:h-5" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-gray-800 font-semibold text-xs md:text-sm">
                  Best home chef in surat 2022
                </h3>
              </div>
            </div>

            <div className="bg-gray-200 w-full h-14 md:h-16 rounded-md flex items-center px-3 md:px-4 gap-3">
              <div className="w-7 h-7 md:w-8 md:h-8 bg-red-100 rounded-full flex items-center justify-center">
                <IoIosRestaurant className="text-red-600 w-6 h-6 md:w-7 md:h-7" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-gray-800 font-semibold text-xs md:text-sm">
                  YouTube recipe creator 2025
                </h3>
              </div>
            </div>

            <div className="bg-gray-200 w-full h-14 md:h-16 rounded-md flex items-center px-3 md:px-4 gap-3">
              <div className="w-7 h-7 md:w-8 md:h-8 bg-red-100 rounded-full flex items-center justify-center">
                <IoIosRestaurant className="text-red-600 w-6 h-6 md:w-7 md:h-7" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-gray-800 font-semibold text-xs md:text-sm">
                  10k+ users across all social platforms
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonial;
