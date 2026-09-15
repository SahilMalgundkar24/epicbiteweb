import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Recipe PDFs",
  description:
    "Download printable recipe PDFs from Epic Bite. Browse vegetarian and non-vegetarian recipe collections.",
  path: "/pdf-recipes",
});

export default function PdfRecipesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
