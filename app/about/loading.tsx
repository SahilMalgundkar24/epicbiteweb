import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/reusable/LoadingSpinner";

export default function AboutLoading() {
  return (
    <div className="px-5 md:px-10 lg:px-16">
      <Navbar />
      <div className="mt-10 w-full mx-auto py-8">
        <div className="h-8 w-64 bg-gray-200 rounded-lg animate-pulse mx-auto" />
        <div className="w-full h-px bg-gray-300 my-4" />
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-4 bg-gray-100 rounded animate-pulse" />
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <LoadingSpinner label="Loading" />
        </div>
      </div>
      <Footer />
    </div>
  );
}
