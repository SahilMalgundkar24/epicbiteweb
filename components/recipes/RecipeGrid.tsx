import Link from "next/link";
import RecipeImage from "@/components/reusable/RecipeImage";
import type { RecipeListItem } from "@/lib/recipes";

interface RecipeGridProps {
  recipes: RecipeListItem[];
}

export default function RecipeGrid({ recipes }: RecipeGridProps) {
  if (recipes.length === 0) {
    return <p>No recipes found.</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-8">
      {recipes.map((recipe) => (
        <Link
          href={`/recipes/${recipe.id}`}
          key={recipe.id}
          className="w-full shrink-0 select-none cursor-pointer block"
        >
          <RecipeImage
            src={recipe.image_url}
            alt={recipe.title}
            imageClassName="rounded-lg object-cover bg-gray-200"
          />
          <h2 className="text-base lg:text-lg font-semibold mt-0">{recipe.title}</h2>
          <p className="text-xs lg:text-sm text-black/50">by Sadika Inamdar</p>
        </Link>
      ))}
    </div>
  );
}
