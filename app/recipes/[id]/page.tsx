import Navbar from "@/components/Navbar";
import React from "react";
import Image from "next/image";
import supabase from "@/lib/supabase";
import Footer from "@/components/Footer";
import { FaYoutube } from "react-icons/fa6";
import DownloadRecipeButton from "@/components/DownloadRecipeButton";

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
      </div>
    );
  }

  // Normalize fields with safe fallbacks
  const title = data.title ?? "Recipe";
  const description = data.description ?? "";
  const image = data.image_url ?? "/images/temp.jpg";
  const chef = data.chef_name ?? "Chef";
  const youtubeUrl = data.youtube_url ?? "";
  const pdfUrl = data.pdf_url ?? "";

  // Support ingredients/instructions stored as arrays or newline-separated strings
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

  const ingredients = parseMaybeArray(
    data.ingredients as unknown as string | string[],
  );
  const procedure = parseMaybeArray(
    data.procedure as unknown as string | string[],
  );

  return (
    <>
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

          {/* Black overlay */}
          <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/70"></div>

          {/* Title text at bottom */}
          <div className="absolute bottom-0 left-0 w-full px-4 lg:px-7 py-4 text-white z-10">
            <h3 className="text-2xl lg:text-4xl font-bold leading-tight">
              {title}
            </h3>
          </div>
        </div>
        <div className="text-gray-500 mt-7">{description}</div>

        {/* <div className="mt-3 flex">
          <DownloadRecipeButton
            recipeData={{
              title,
              description,
              image,
              chef,
              ingredients,
              procedure,
              youtubeUrl,
            }}
          />
        </div> */}

        {pdfUrl && (
          <div className="mt-4 flex">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full 
                 bg-gray-900 text-white hover:bg-gray-800 transition"
            >
              View Recipe PDF
            </a>
          </div>
        )}

        <div className="mt-7 w-full lg:w-5/6">
          <div className="border border-gray-200 p-7 rounded-2xl">
            <h1 className="text-2xl font-semibold mb-4">Ingredients</h1>

            {/* Ingredients in two columns */}
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
                    <h1 className="text-gray-700">{inst}</h1>
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
              <h1 className="text-white text-center">Watch on YouTube</h1>
              <FaYoutube color="white" size={28} />
            </a>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}
