import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import PopularRecipes from "@/components/PopularRecipes";
import Testimonial from "@/components/Testimonial";
import Youtube from "@/components/Youtube";
import { createMetadata } from "@/lib/metadata";
import { getCategories, getPopularRecipes } from "@/lib/recipes";

export const metadata = createMetadata({
  title: "Homemade Recipes for Everyday Cooking",
  description:
    "Discover simple, flavorful homemade recipes from Epic Bite. Easy everyday cooking, baking, veg and non-veg dishes, and healthy millet meals.",
  path: "/",
});

export const revalidate = 3600;

export default async function Home() {
  const [recipes, categories] = await Promise.all([
    getPopularRecipes("All", 5),
    getCategories(),
  ]);

  return (
    <div className="px-5 md:px-10 lg:px-16">
      <Navbar />
      <Hero />
      <Testimonial />
      <PopularRecipes recipes={recipes} categories={categories} />
      <Youtube />
      <Footer />
    </div>
  );
}
