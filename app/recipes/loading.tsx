import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RecipeGridSkeleton from "@/components/reusable/RecipeGridSkeleton";
import CategoryPillsSkeleton from "@/components/reusable/CategoryPillsSkeleton";

export default function RecipesLoading() {
  return (
    <div className="px-5 md:px-10 lg:px-16">
      <Navbar />
      <div className="py-3 lg:py-8">
        <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
          <div className="h-9 w-48 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-9 w-32 bg-gray-100 rounded-full animate-pulse" />
        </div>
        <div className="mb-5">
          <CategoryPillsSkeleton />
        </div>
        <RecipeGridSkeleton count={8} />
      </div>
      <Footer />
    </div>
  );
}
