import RecipeCard from "@/app/recipes/recipeCard";

interface Recipe {
  id: number;
  title: string;
  image: string;
}

interface ApiResponse {
  results: Recipe[];
}

interface Props {
  searchParams: {
    query?: string;
    cuisine?: string;
    maxReadyTime?: string;
  };
}

export default async function RecipesPage({ searchParams }: Props) {
  const { query, cuisine, maxReadyTime } = searchParams;

  const params = new URLSearchParams();

  if (query) params.append("query", query);
  if (cuisine) params.append("cuisine", cuisine);
  if (maxReadyTime) params.append("maxReadyTime", maxReadyTime);

  params.append("apiKey", process.env.NEXT_PUBLIC_API_KEY!);

  let recipes: Recipe[] = [];

  try {
    const url = `https://api.spoonacular.com/recipes/complexSearch?${params.toString()}`;
    const response = await fetch(url, { cache: "no-store" });
    const data: ApiResponse = await response.json();
    recipes = data.results || [];
  } catch (error) {
    console.error("Failed to fetch recipes:", error);
  }

  return (
      <div className="relative w-full min-h-screen bg-[url('https://www.justalittlebitofbacon.com/wp-content/uploads/2016/06/grilled-breaded-chicken-1.jpg')] bg-repeat bg-cover bg-center px-6 py-12">
        <div className="absolute inset-0 bg-black opacity-50 z-0" />

        <div className="relative z-10">
          {recipes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
                {recipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
          ) : (
              <div className="flex flex-col items-center justify-center min-h-screen text-white">
                <p className="text-xl font-semibold mb-4 text-center">
                  There's no recipes matching your filter.
                </p>
                <a className="text-xl font-semibold underline text-center" href="/">
                  Click to go back
                </a>
              </div>
          )}
        </div>
      </div>
  );
}
