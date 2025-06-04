"use client";

import { useRouter } from "next/navigation";

interface Recipe {
  id: number;
  title: string;
  image: string;
}

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const router = useRouter();

  const handleOpenRecipe = () => {
    router.push(`/recipes/${recipe.id}`);
  };

  return (
    <div className="relative z-10 bg-[#FFF8DC] p-6 rounded-2xl shadow-xl text-amber-900 w-[300px] break-words flex flex-col items-center transition-transform duration-300 hover:scale-[1.03]">
      <h3 className="text-xl font-bold mb-3 text-amber-800 text-center">
        {recipe.title}
      </h3>

      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-48 object-cover rounded-lg shadow-md mb-4"
      />

      <button
        onClick={handleOpenRecipe}
        className="mt-auto bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 px-5 rounded-lg transition-colors duration-300 shadow"
      >
        View Recipe
      </button>
    </div>
  );
}
