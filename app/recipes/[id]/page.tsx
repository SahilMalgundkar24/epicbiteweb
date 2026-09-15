import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import supabase from "@/lib/supabase";
import Footer from "@/components/Footer";
import { FaYoutube } from "react-icons/fa6";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

const parseMaybeArray = (v?: string | string[]) => {
  if (!v) return [] as string[];
  if (Array.isArray(v)) return v;
  try {
    const parsed = JSON.parse(v as string);
    if (Array.isArray(parsed)) return parsed;
  } catch {
    // not JSON
  }
  return v
    .split(/\r?\n|\|/)
    .map((s) => s.trim())
    .filter(Boolean);
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const recipeId = parseInt(id, 10);

  if (isNaN(recipeId)) {
    return createMetadata({
      title: "Recipe Not Found",
      description: "The requested recipe could not be found on Epic Bite.",
      path: `/recipes/${id}`,
      noIndex: true,
    });
  }

  const { data } = await supabase
    .from("recipes")
    .select("title, description, image_url")
    .eq("id", recipeId)
    .single();

  if (!data) {
    return createMetadata({
      title: "Recipe Not Found",
      description: "The requested recipe could not be found on Epic Bite.",
      path: `/recipes/${id}`,
      noIndex: true,
    });
  }

  const description =
    data.description?.slice(0, 160) ||
    `Learn how to make ${data.title} with step-by-step ingredients and cooking instructions from Epic Bite.`;

  return createMetadata({
    title: `${data.title} Recipe`,
    description,
    path: `/recipes/${id}`,
    images: data.image_url ? [data.image_url] : undefined,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const recipeId = parseInt(id, 10);

  if (isNaN(recipeId)) {
    return (
      <div className="px-16">
        <Navbar />
        <div className="py-10 text-red-600">Invalid recipe ID</div>
        <Footer />
      </div>
    );
  }

  const { data, error } = await supabase
    .from("recipes")
    .select("*")
    .eq("id", recipeId)
    .single();

  if (error || !data) {
    return (
      <div className="px-16">
        <Navbar />
        <div className="py-10 text-red-600">Recipe not found.</div>
        <Footer />
      </div>
    );
  }

  const title = data.title ?? "Recipe";
  const description = data.description ?? "";
  const image = data.image_url ?? "/images/temp.jpg";
  const chef = data.chef_name ?? "Sadika Inamdar";
  const youtubeUrl = data.youtube_url ?? "";
  const pdfUrl = data.pdf_url ?? "";

  const ingredients = parseMaybeArray(
    data.ingredients as unknown as string | string[],
  );
  const procedure = parseMaybeArray(
    data.procedure as unknown as string | string[],
  );

  const recipeJsonLd = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: title,
    description: description || `Homemade ${title} recipe from Epic Bite.`,
    image: [image.startsWith("http") ? image : `${siteConfig.url}${image}`],
    author: {
      "@type": "Person",
      name: chef,
    },
    recipeIngredient: ingredients,
    recipeInstructions: procedure.map((step) => ({
      "@type": "HowToStep",
      text: step,
    })),
    url: `${siteConfig.url}/recipes/${recipeId}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeJsonLd) }}
      />
      <div className="px-5 md:px-10 lg:px-16">
        <Navbar />

        <div className="relative w-full h-80 rounded-xl overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            sizes="100vw"
            priority
            className="object-cover rounded-xl"
          />

          <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/70" />

          <div className="absolute bottom-0 left-0 w-full px-4 lg:px-7 py-4 text-white z-10">
            <h1 className="text-2xl lg:text-4xl font-bold leading-tight">
              {title}
            </h1>
            <p className="text-sm text-white/80 mt-1">by {chef}</p>
          </div>
        </div>
        <div className="text-gray-500 mt-7">{description}</div>

        {pdfUrl && (
          <div className="mt-4 flex">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition"
            >
              View Recipe PDF
            </a>
          </div>
        )}

        <div className="mt-7 w-full lg:w-5/6">
          <div className="border border-gray-200 p-7 rounded-2xl">
            <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 text-gray-700">
              {ingredients.length > 0 ? (
                ingredients.map((ing, idx) => {
                  const isBold = ing.trim().startsWith("*");
                  const text = isBold ? ing.trim().slice(1).trim() : ing;

                  return (
                    <p key={idx}>
                      {isBold ? (
                        <span className="font-semibold text-black">
                          • {text}
                        </span>
                      ) : (
                        `• ${text}`
                      )}
                    </p>
                  );
                })
              ) : (
                <p>No ingredients listed.</p>
              )}
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-3xl font-semibold mb-3">
              Cooking <span className="text-[#CE2425]">Instructions</span>
            </h2>
            <div className="space-y-5">
              {procedure.length > 0 ? (
                procedure.map((inst, idx) => (
                  <div key={idx} className="flex items-center gap-7 px-1">
                    <p className="text-gray-700">{inst}</p>
                  </div>
                ))
              ) : (
                <div className="text-gray-700">No instructions provided.</div>
              )}
            </div>
          </div>

          {youtubeUrl && (
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-[#CE2425] rounded-lg flex justify-center items-center gap-4 hover:bg-[#b91d1e] transition mt-5"
            >
              <span className="text-white text-center">Watch on YouTube</span>
              <FaYoutube color="white" size={28} />
            </a>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}
