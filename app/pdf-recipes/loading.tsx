import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PdfRecipesLoading() {
  return (
    <div className="px-5 md:px-10 lg:px-16">
      <Navbar />
      <div className="py-3 lg:py-8">
        <div className="h-9 w-40 bg-gray-200 rounded-lg animate-pulse mb-4" />
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-9 w-20 bg-gray-100 rounded-full animate-pulse"
            />
          ))}
        </div>
        <div className="w-full h-px bg-gray-200 mb-6" />
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-16 bg-gray-100 rounded-xl animate-pulse"
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
