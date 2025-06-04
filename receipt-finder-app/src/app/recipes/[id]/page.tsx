import { Suspense } from "react";

export default function RecipeDetailsPage({
  params,
}: {
  params: { id: number };
}) {
  return (
    <Suspense
      fallback={
        <div className="text-center p-10 text-lg">
          ...Loading, please wait...
        </div>
      }
    >
      <RecipeDetailsContent params={params} />
    </Suspense>
  );
}

interface Ingredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
  original: string;
  image: string;
}

interface RecipeDetails {
  id: number;
  title: string;
  image: string;
  summary: string;
  readyInMinutes: number;
  servings: number;
  extendedIngredients: Ingredient[];
}

async function RecipeDetailsContent({ params }: { params: { id: number } }) {
  const res = await fetch(
    `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${process.env.NEXT_PUBLIC_API_KEY}`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error("Failed to load recipe details");
  }

  const recipe: RecipeDetails = await res.json();

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-8 text-amber-900">
      <div className="max-w-3xl w-full">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="rounded mb-4 mx-auto"
        />
        <h1 className="text-3xl font-bold mb-2 text-center">{recipe.title}</h1>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Ready in {recipe.readyInMinutes} minutes | Serving for{" "}
          {recipe.servings} people
        </p>
        <div
          className="prose max-w-none mx-auto mb-8"
          dangerouslySetInnerHTML={{ __html: recipe.summary }}
        />

        <h2 className="text-2xl font-semibold mb-4 text-center">Ingredients</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {recipe.extendedIngredients.map((ingredient, index) => (
            <li
              key={`${ingredient.id}-${ingredient.name}-${index}`}
              className="flex items-center gap-4"
            >
              <img
                src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
                alt={ingredient.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <p className="font-semibold text-lg">{ingredient.original}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
