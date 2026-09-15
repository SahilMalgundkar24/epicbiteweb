import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BsInstagram } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa6";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "About Epic Bite",
  description:
    "Learn about Epic Bite, our homemade recipe journey since 2015, cooking classes, and community for veg and non-veg home cooking.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="px-5 md:px-10 lg:px-16">
      <Navbar />

      <div className="mt-10 w-full mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mt-10 text-center">
          ABOUT <span className="text-[#BB2325]">EPIC BITE</span>
        </h2>

        <div className="w-full h-px bg-gray-300 my-4" />

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

        <h3 className="text-xl md:text-2xl font-semibold mt-10">
          Grow with Us
        </h3>

        <div className="w-full h-px bg-gray-300 my-4" />

        <p className="text-gray-600 leading-7 text-base md:text-lg">
          With our recipes, you can start your own home business or cloud
          kitchen. We also provide personal guidance to aspiring food-preneurs.
        </p>

        <h3 className="text-xl md:text-2xl font-semibold mt-10">
          Join Our Community
        </h3>

        <div className="w-full h-px bg-gray-300 my-4" />

        <p className="text-gray-600 leading-7 text-base md:text-lg">
          Want to learn or grow? Join our WhatsApp group by dropping us a
          message. We&apos;d love to welcome you!
        </p>

        <a
          href="https://wa.me/919898161843?text=Heyyy%20I%20am%20interested%20in%20joining%20the%20group"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-green-600 text-white text-center py-3 rounded-xl mt-5 font-medium hover:bg-green-700 transition"
        >
          Join WhatsApp Community
        </a>

        <h3 className="text-xl md:text-2xl font-semibold mt-10">
          Follow our Socials
        </h3>

        <div className="w-full h-px bg-gray-300 my-4" />

        <p className="text-gray-600 leading-7 text-base md:text-lg">
          Stay connected and updated with our latest recipes, tips, and videos!
        </p>

        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-4">
            <BsInstagram size={20} />
            <a
              href="https://www.instagram.com/myepicbite"
              className="text-[#1877F3] text-lg hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              @myepicbite
            </a>
          </div>

          <div className="flex items-center gap-4">
            <BsInstagram size={20} />
            <a
              href="https://www.instagram.com/myepicbite.kitchen"
              className="text-[#1877F3] text-lg hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              @myepicbite.kitchen
            </a>
          </div>

          <div className="flex items-center gap-4">
            <FaYoutube size={20} />
            <a
              href="https://www.youtube.com/@myepicbite"
              className="text-red-600 text-lg hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              @myepicbite
            </a>
          </div>

          <div className="flex items-center gap-4">
            <FaYoutube size={20} />
            <a
              href="https://www.youtube.com/@myepicbitekitchen"
              className="text-red-600 text-lg hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              @myepicbitekitchen
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
