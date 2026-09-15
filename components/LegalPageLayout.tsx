import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export default function LegalPageLayout({
  title,
  lastUpdated,
  children,
}: LegalPageLayoutProps) {
  return (
    <div className="px-5 md:px-10 lg:px-16">
      <Navbar />
      <article className="max-w-3xl mx-auto py-8 lg:py-12">
        <h1 className="text-2xl md:text-4xl font-semibold">{title}</h1>
        <p className="text-sm text-gray-500 mt-2">Last updated: {lastUpdated}</p>
        <div className="w-full h-px bg-gray-200 my-6" />
        <div className="space-y-6 text-gray-700 leading-7 text-base md:text-lg">
          {children}
        </div>
      </article>
      <Footer />
    </div>
  );
}
