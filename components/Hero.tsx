import React from "react";
import Image from "next/image";
import ExploreRecipesLink from "@/components/ExploreRecipesLink";

const Hero = () => {
  return (
    <div className="relative w-full flex flex-col items-center justify-center h-full overflow-hidden">
      <Image
        src="/images/herobg1.png"
        alt=""
        width={160}
        height={160}
        className="hidden lg:block absolute top-6 left-10 w-32 md:w-40 opacity-90"
      />
      <Image
        src="/images/herobg2.png"
        alt=""
        width={160}
        height={160}
        className="hidden lg:block absolute top-32 right-16 w-32 md:w-40 opacity-90"
      />
      <Image
        src="/images/herobg4.png"
        alt=""
        width={192}
        height={192}
        className="hidden lg:block absolute top-0 right-1/4 w-32 md:w-48 opacity-80"
      />
      <Image
        src="/images/herobg5.png"
        alt=""
        width={192}
        height={192}
        className="hidden lg:block absolute top-24 left-1/4 w-32 md:w-48 opacity-80"
      />

      <div className="mt-12 w-full flex justify-center items-center mb-3 z-10">
        <div className="px-3 py-1 border border-gray-300 rounded-full flex items-center gap-2 bg-white/70 backdrop-blur-sm">
          <div className="flex -space-x-2">
            <Image
              src="/images/user1.png"
              alt="User 1"
              width={24}
              height={24}
              className="w-6 h-6 rounded-full border-2 border-white object-cover"
            />
            <Image
              src="/images/user2.png"
              alt="User 2"
              width={24}
              height={24}
              className="w-6 h-6 rounded-full border-2 border-white object-cover"
            />
            <Image
              src="/images/user3.png"
              alt="User 3"
              width={24}
              height={24}
              className="w-6 h-6 rounded-full border-2 border-white object-cover"
            />
          </div>
          <h1 className="text-xs font-medium text-gray-700">
            Loved by 8k+ users
          </h1>
        </div>
      </div>

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

      <Image
        src="/images/herobg6.png"
        alt=""
        width={160}
        height={160}
        className="hidden lg:block absolute top-[35%] left-10 w-32 md:w-40 opacity-80"
      />
      <Image
        src="/images/herobg7.png"
        alt=""
        width={160}
        height={160}
        className="hidden lg:block absolute top-[35%] right-12 w-32 md:w-40 opacity-80"
      />
      <Image
        src="/images/herobg2.png"
        alt=""
        width={160}
        height={160}
        className="hidden lg:block absolute top-[50%] left-[20%] w-32 md:w-40 opacity-60"
      />
      <Image
        src="/images/herobg3.png"
        alt=""
        width={160}
        height={160}
        className="hidden lg:block absolute top-[50%] right-[15%] w-32 md:w-40 opacity-70"
      />

      <div className="flex flex-col sm:flex-row gap-4 md:gap-7 mt-6 z-10">
        <ExploreRecipesLink />
      </div>

      <div className="relative flex justify-center w-full mt-12 z-10 h-96 lg:h-[32rem]">
        <Image
          src="/images/Ellipse.png"
          alt="Hero ellipse"
          width={512}
          height={512}
          className="w-96 lg:w-[32rem] h-96 lg:h-[32rem] object-cover"
        />
        <Image
          src="/images/image.png"
          alt="Hero food image"
          width={512}
          height={512}
          className="absolute top-1/2 left-1/2 w-96 lg:w-[32rem] h-96 lg:h-[32rem] object-cover -translate-x-1/2 -translate-y-1/2"
        />

        <Image
          src="/images/herobg1.png"
          alt=""
          width={160}
          height={160}
          className="hidden lg:block absolute bottom-12 left-12 w-32 md:w-40 opacity-90"
        />
        <Image
          src="/images/herobg4.png"
          alt=""
          width={160}
          height={160}
          className="hidden lg:block absolute bottom-16 right-20 w-32 md:w-40 opacity-90"
        />
        <Image
          src="/images/herobg5.png"
          alt=""
          width={160}
          height={160}
          className="hidden lg:block absolute bottom-8 left-1/2 w-32 md:w-40 -translate-x-1/2 opacity-80"
        />
        <Image
          src="/images/herobg6.png"
          alt=""
          width={160}
          height={160}
          className="hidden lg:block absolute bottom-0 right-1/3 w-32 md:w-40 opacity-80"
        />
        <Image
          src="/images/herobg7.png"
          alt=""
          width={160}
          height={160}
          className="hidden lg:block absolute bottom-4 left-1/4 w-32 md:w-40 opacity-90"
        />
      </div>
    </div>
  );
};

export default Hero;
