import Navbar from "@/components/Navbar";
import React from "react";
import { BsInstagram } from "react-icons/bs";
import { FaInstagram, FaYoutube } from "react-icons/fa6";

const page = () => {
  return (
    <div className="px-5 md:px-10 lg:px-16">
      <Navbar />

      <div className="mt-10 w-full mx-auto">
        {/* About */}
        <h2 className="text-2xl md:text-3xl font-bold mt-10 text-center">
          ABOUT <span className="text-[#BB2325]">EPIC BITE</span>
        </h2>

        <div className="w-full h-px bg-gray-300 my-4"></div>

        <p className="text-gray-600 leading-7 text-base md:text-lg">
          We began our baking journey in 2015. In 2018, we started offering
          online classes in both baking and cooking. By 2020, we launched Epic
          Bite, featuring separate cooking classes for vegetarian and
          non-vegetarian dishes. We now run two distinct pages—Epic Bite for
          non-veg and Epic Bite SweetDelight for veg—each active on Facebook,
          YouTube, and Instagram.
          <br />
          <br />
          Our recipes are homemade, preservative-free, and restaurant-style,
          using everyday ingredients—no fancy or hard-to-find items. We also
          specialize in healthy, gluten-free, and millet-based meals—all on one
          platform.
        </p>

        {/* Grow With Us */}
        <h3 className="text-xl md:text-2xl font-semibold mt-10">
          Grow with Us
        </h3>

        <div className="w-full h-px bg-gray-300 my-4"></div>

        <p className="text-gray-600 leading-7 text-base md:text-lg">
          With our recipes, you can start your own home business or cloud
          kitchen. We also provide personal guidance to aspiring food-preneurs.
        </p>

        {/* Join Community */}
        <h3 className="text-xl md:text-2xl font-semibold mt-10">
          Join Our Community
        </h3>

        <div className="w-full h-px bg-gray-300 my-4"></div>

        <p className="text-gray-600 leading-7 text-base md:text-lg">
          Want to learn or grow? Join our WhatsApp group by dropping us a
          message. We&apos;d love to welcome you!
        </p>

        <a
          href="https://wa.me/919898161843?text=Heyyy%20I%20am%20interested%20in%20joining%20the%20group"
          target="_blank"
          className="block w-full bg-green-600 text-white text-center py-3 rounded-xl mt-5 font-medium hover:bg-green-700 transition"
        >
          Join WhatsApp Community
        </a>

        {/* Socials */}
        <h3 className="text-xl md:text-2xl font-semibold mt-10">
          Follow our Socials
        </h3>

        <div className="w-full h-px bg-gray-300 my-4"></div>

        <p className="text-gray-600 leading-7 text-base md:text-lg">
          Stay connected and updated with our latest recipes, tips, and videos!
        </p>

        <div className="mt-6 space-y-4">
          {/* Instagram */}
          <div className="flex items-center gap-4">
            <BsInstagram size={20} />
            <a
              href="https://www.instagram.com/epicbite_official"
              className="text-[#1877F3] text-lg hover:underline"
              target="_blank"
            >
              @epicbite_official
            </a>
          </div>

          <div className="flex items-center gap-4">
            <BsInstagram size={20} />
            <a
              href="https://www.instagram.com/epicbite.vegdelight"
              className="text-[#1877F3] text-lg hover:underline"
              target="_blank"
            >
              @epicbite.vegdelight
            </a>
          </div>

          {/* YouTube */}
          <div className="flex items-center gap-4">
            <FaYoutube size={20} />
            <a
              href="https://youtube.com/@theepicbite?si=2-7AEFmEokboZ0yi"
              className="text-red-600 text-lg hover:underline"
              target="_blank"
            >
              @theepicbite
            </a>
          </div>

          <div className="flex items-center gap-4">
            <FaYoutube size={20} />
            <a
              href="https://youtube.com/@epicbitevegdelight?si=-3-Q0p0j509Dc7_T"
              className="text-red-600 text-lg hover:underline"
              target="_blank"
            >
              @epicbitevegdelight
            </a>
          </div>
        </div>

        <div className="h-10"></div>
      </div>
    </div>
  );
};

export default page;
