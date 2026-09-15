import Link from "next/link";
import CategoryFilterLinks from "@/components/recipes/CategoryFilterLinks";
import PopularRecipesSlider from "@/components/PopularRecipesSlider";
import RecipeImage from "@/components/reusable/RecipeImage";
import type { Category, RecipeListItem } from "@/lib/recipes";

interface PopularRecipesProps {
  recipes: RecipeListItem[];
  categories: Category[];
}

export default function PopularRecipes({
  recipes,
  categories,
}: PopularRecipesProps) {
  return (
    <div className="py-8">
      <h2 className="text-2xl md:text-4xl font-semibold">
        Popular <span className="text-[#CE2425]">Recipes</span>
      </h2>
      <p className="mb-5 text-gray-600 lg:text-base text-sm">
        Browse through a collection of our most loved recipes from quick snacks
        to traditional delicacies.
      </p>

      <CategoryFilterLinks categories={categories} />

      <PopularRecipesSlider>
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <Link
              href={`/recipes/${recipe.id}`}
              key={recipe.id}
              className="w-[90%] lg:w-1/4 shrink-0 select-none cursor-pointer block"
            >
              <RecipeImage
                src={recipe.image_url}
                alt={recipe.title}
                sizes="(max-width: 1024px) 90vw, 25vw"
                imageClassName="rounded-lg object-cover bg-gray-200"
              />
              <h3 className="text-lg font-semibold">{recipe.title}</h3>
              <p className="text-sm text-black/50">by Sadika Inamdar</p>
            </Link>
          ))
        ) : (
          <p>No recipes found for this category.</p>
        )}
      </PopularRecipesSlider>
    </div>
  );
}
