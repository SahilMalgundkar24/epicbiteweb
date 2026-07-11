import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import PopularRecipes from "@/components/PopularRecipes";
import Testimonial from "@/components/Testimonial";
import Youtube from "@/components/Youtube";

export default function Home() {
  return (
    <div className="px-5 md:px-10 lg:px-16">
      <Navbar />
      <Hero />
      <Testimonial />
      <PopularRecipes />
      <Youtube />
      <Footer />
    </div>
  );
}
