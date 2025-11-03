import Navbar from "@/components/Navbar";
import React from "react";

const page = () => {
  return (
    <>
      <div className="px-16">
        <Navbar />

        <div className="relative w-full h-80 rounded-xl overflow-hidden">
          {/* Image */}
          <img
            src="/images/temp.jpg"
            alt="Recipe"
            className="w-full h-full object-cover rounded-xl overflow-hidden"
          />

          {/* Black overlay */}
          <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/70"></div>

          {/* Title text at bottom */}
          <div className="absolute bottom-0 left-0 w-full px-7 py-4 text-white z-10">
            <h3 className="text-4xl font-bold leading-tight">Fish Fry</h3>
          </div>
        </div>
        <div className="mt-7 flex gap-2">
          <div className="flex flex-col w-5/6 justify-between ">
            <div className="text-gray-500 ">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas rem
              at blanditiis delectus sint eaque dolorum, iure non ex culpa?
              Pariatur aspernatur earum illo omnis totam tenetur corporis
              molestias eius! orem ipsum dolor sit, amet consectetur adipisicing
              elit. Quas rem at blanditiis delectus sint eaque dolorum, iure non
              ex culpa? Pariatur aspernatur earum illo omnis totam tenetur
              corporis molestias eius!
            </div>
            <div className="flex justify-between">
              <div className="">
                <h1 className=" font-semibold">Tags</h1>
                <h1 className="text-[#CE2425]">Nonveg, Starters</h1>
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
                <h3 className="text-lg font-semibold leading-tight">
                  Chef Sadika Inamdar
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 w-5/6">
          <div className="border border-gray-200 p-7 rounded-2xl">
            <h1 className="text-2xl font-semibold mb-4">Ingredients</h1>

            {/* Ingredients in two columns */}
            <div className="grid grid-cols-2 gap-2 text-gray-700">
              <p>• 500g fish fillets</p>
              <p>• 1 tsp turmeric powder</p>
              <p>• 1 tbsp red chili powder</p>
              <p>• 1 tbsp ginger-garlic paste</p>
              <p>• 2 tbsp lemon juice</p>
              <p>• 3 tbsp rice flour or semolina</p>
              <p>• Salt to taste</p>
              <p>• Oil for shallow frying</p>
              <p>• Fresh coriander for garnish</p>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-3xl font-semibold mb-3">
              Cooking <span className="text-[#CE2425]">Instructions</span>
            </h2>
            <div className="space-y-5">
              <div className="flex items-center gap-7 bg-[#f7f7f7] p-6 rounded-xl">
                <div className="text-4xl text-[#CE2425] font-semibold">01</div>
                <p className="text-gray-700">
                  Clean and wash the fish fillets thoroughly, then pat them dry.
                </p>
              </div>

              <div className="flex items-center gap-7 bg-[#f7f7f7] p-6 rounded-xl">
                <div className="text-4xl text-[#CE2425] font-semibold">02</div>
                <p className="text-gray-700">
                  In a bowl, mix turmeric, chili powder, ginger-garlic paste,
                  lemon juice, and salt to create a marinade.
                </p>
              </div>

              <div className="flex items-center gap-7 bg-[#f7f7f7] p-6 rounded-xl">
                <div className="text-4xl text-[#CE2425] font-semibold">03</div>
                <p className="text-gray-700">
                  Coat the fish pieces evenly with the marinade and let them
                  rest for 20–30 minutes.
                </p>
              </div>

              <div className="flex items-center gap-7 bg-[#f7f7f7] p-6 rounded-xl">
                <div className="text-4xl text-[#CE2425] font-semibold">04</div>
                <p className="text-gray-700">
                  Heat oil in a pan over medium flame and coat each fish piece
                  lightly with rice flour or semolina.
                </p>
              </div>

              <div className="flex items-center gap-7 bg-[#f7f7f7] p-6 rounded-xl">
                <div className="text-4xl text-[#CE2425] font-semibold">05</div>
                <p className="text-gray-700">
                  Shallow-fry until golden brown and crisp on both sides.
                  Garnish with coriander and serve hot.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
