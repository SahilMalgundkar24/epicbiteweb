import React from "react";

const Youtube = () => {
  return (
    <>
      <div className="mt-5 lg:mt-20 flex lg:flex-row flex-col justify-between items-center gap-2 lg:gap-5 mb-5">
        <div className="w-full lg:w-1/2 text-2xl md:text-4xl font-semibold leading-[1.2] tracking-wide ">
          Step into My <br className="hidden lg:block"></br>Kitchen on{" "}
          <span className="text-[#CE2425]">YouTube</span>
        </div>

        <div className="w-full lg:w-1/2 lg:text-base text-sm">
          Discover exclusive video recipes, kitchen hacks, and behind-the-scenes
          cooking moments.
          <div className="flex w-full justify-start mt-3">
            <div className="bg-[#CE2425] rounded-full px-6 py-2 text-white text-sm flex items-center gap-3 justify-center">
              <h1>Explore Youtube</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="flex lg:flex-row flex-col justify-between items-center gap-5">
        <div className="w-full lg:w-1/2 h-120 bg-amber-200 rounded-lg">
          <img
            src="/images/youtubeImage.png"
            className="w-full h-120 object-cover"
          />
        </div>
        <div className="w-full lg:w-1/2 h-120 relative rounded-lg overflow-hidden">
          {/* Image */}
          <img
            src="/images/khala.png"
            alt="Khala"
            className="w-full h-full object-cover"
          />

          {/* Bottom Overlay */}
          <div className="absolute inset-0 bg-linear-to-b from-transparent to-[#CE2425]/50"></div>

          {/* Text on Overlay */}
          <div className="absolute bottom-0 left-0 p-6 text-white flex justify-between gap-12">
            <div className="w-1/2">
              <h2 className="lg:text-5xl text-3xl font-semibold">100+</h2>
              <p className="text-sm mt-2 max-w-md text-gray-200">
                Watch 100+ recipes come alive one dish at a time.
              </p>
            </div>

            <div className="w-1/2">
              <h2 className="lg:text-5xl text-3xl font-semibold">8k+</h2>
              <p className="text-sm mt-2 max-w-md text-gray-200">
                Join the lively community of 8K+ users across all the platforms
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Youtube;
