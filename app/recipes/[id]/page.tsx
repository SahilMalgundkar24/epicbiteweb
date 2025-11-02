/* eslint-disable @next/next/no-img-element */
import Navbar from "@/components/Navbar";
import React from "react";
import supabase from "@/lib/supabase";

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

  // Server-side fetch using the existing Supabase client (anonymous key).
  // If you want to use a service role key for server-only access, create a
  // separate server client and don't expose that key to the browser.
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
    data.ingredients as unknown as string | string[]
  );
  const procedure = parseMaybeArray(
    data.procedure as unknown as string | string[]
  );

  return (
    <>
      <div className="px-16">
        <Navbar />

        <div className="relative w-full h-80 rounded-xl overflow-hidden">
          {/* Image */}
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover rounded-xl overflow-hidden"
          />

          {/* Black overlay */}
          <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/70"></div>

          {/* Title text at bottom */}
          <div className="absolute bottom-0 left-0 w-full px-7 py-4 text-white z-10">
            <h3 className="text-4xl font-bold leading-tight">{title}</h3>
          </div>
        </div>
        <div className="mt-7 flex gap-2">
          <div className="flex flex-col w-5/6 justify-between ">
            <div className="text-gray-500 ">{description}</div>
            <div className="flex justify-between">
              <div className="">
                <h1 className=" font-semibold">Tags</h1>
                <h1 className="text-[#CE2425]">
                  {Array.isArray(data.tags) ? data.tags.join(", ") : data.tags}
                </h1>
              </div>
              <div className="px-6 py-2 flex justify-center items-center bg-gray-900 text-sm text-white rounded-full">
                Download Recipe PDF
              </div>
            </div>
          </div>
          <div className="w-1/6 h-56 bg-gray-300">
            <div className="relative w-full h-56 rounded-xl overflow-hidden">
              {/* Image */}
              <img
                src="/images/chef.png"
                alt="chef"
                className="w-full h-full object-cover rounded-xl overflow-hidden"
              />

              {/* Black overlay */}
              <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/70"></div>

              {/* Title text */}
              <div className="absolute bottom-0 left-0 w-full p-4 text-white z-10">
                <h3 className="text-lg font-semibold leading-tight">{chef}</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 w-5/6">
          <div className="border border-gray-200 p-7 rounded-2xl">
            <h1 className="text-2xl font-semibold mb-4">Ingredients</h1>

            {/* Ingredients in two columns */}
            <div className="grid grid-cols-2 gap-2 text-gray-700">
              {ingredients.length > 0 ? (
                ingredients.map((ing, idx) => <p key={idx}>• {ing}</p>)
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
                  <div
                    key={idx}
                    className="flex items-center gap-7 bg-[#f7f7f7] p-6 rounded-xl"
                  >
                    <div className="text-4xl text-[#CE2425] font-semibold">
                      {String(idx + 1).padStart(2, "0")}
                    </div>
                    <p className="text-gray-700">{inst}</p>
                  </div>
                ))
              ) : (
                <div className="text-gray-700">No instructions provided.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
