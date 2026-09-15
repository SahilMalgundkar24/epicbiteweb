import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Explore Recipes",
  description:
    "Browse homemade recipes from Epic Bite. Filter by category and discover easy, flavorful dishes for everyday cooking.",
  path: "/recipes",
});

export default function RecipesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
