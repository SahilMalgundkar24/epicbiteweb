import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/reusable/LoadingSpinner";

export default function RecipeDetailLoading() {
  return (
    <div className="px-5 md:px-10 lg:px-16">
      <Navbar />
      <div className="py-3 lg:py-8">
        <div className="w-full h-80 bg-gray-200 rounded-xl animate-pulse" />
        <div className="mt-7 space-y-3">
          <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-gray-100 rounded animate-pulse" />
          <div className="h-4 w-4/6 bg-gray-100 rounded animate-pulse" />
        </div>
        <div className="mt-7 w-full lg:w-5/6">
          <div className="border border-gray-200 p-7 rounded-2xl animate-pulse">
            <div className="h-7 w-36 bg-gray-200 rounded mb-4" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-4 bg-gray-100 rounded" />
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-12">
          <LoadingSpinner label="Loading recipe" />
        </div>
      </div>
      <Footer />
    </div>
  );
}
