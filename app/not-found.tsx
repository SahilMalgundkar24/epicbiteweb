import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NavLink from "@/components/reusable/NavLink";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Page Not Found",
  description:
    "The page you are looking for could not be found on Epic Bite. Browse our recipes or return to the homepage.",
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <div className="px-5 md:px-10 lg:px-16 min-h-[70vh] flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center text-center py-16">
        <p className="text-[#CE2425] text-sm font-semibold tracking-wide uppercase">
          404
        </p>
        <h1 className="text-3xl md:text-5xl font-semibold mt-3">
          Page not found
        </h1>
        <p className="text-gray-600 mt-4 max-w-md text-base md:text-lg">
          The page you are looking for does not exist or may have been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <NavLink
            href="/"
            className="bg-[#CE2425] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[#b91d1e] transition-colors"
          >
            Back to Home
          </NavLink>
          <Link
            href="/recipes"
            className="bg-[#F7F7F7] text-gray-800 px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            Explore Recipes
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
