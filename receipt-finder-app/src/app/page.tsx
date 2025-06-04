"use client";

import React, { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [hasFilters, setHasFilters] = useState(false);
  const [query, setQuery] = useState<string>("");
  const [cuisine, setCuisine] = useState<string>("");
  const [maxReadyTime, setMaxReadyTime] = useState<string>("");

  const handleSearchRecipe = () => {
    const filters: Record<string, string> = {};

    if (query) filters.query = query;
    if (cuisine) filters.cuisine = cuisine;
    if (maxReadyTime) filters.maxReadyTime = maxReadyTime;

    const params = new URLSearchParams(filters).toString();
    router.push(`/recipes?${params}`);
  };

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setter(e.target.value);
      setHasFilters(true);
    };

  return (
    <div className="bg-[url('https://www.justalittlebitofbacon.com/wp-content/uploads/2016/06/grilled-breaded-chicken-1.jpg')] w-screen h-screen bg-cover grid place-items-center">
      <div className="absolute inset-0 bg-black opacity-50 z-0" />

      <div className="relative z-10 bg-[#FFFFED] p-6 rounded-lg shadow-lg flex flex-col sm:flex-row gap-6 sm:gap-[5rem] justify-between text-amber-900 max-w-full sm:max-w-[90vw] md:max-w-4xl w-full">
        <div className="flex flex-col justify-between w-full sm:w-auto">
          <label htmlFor="query" className="mb-1">
            What do you want to cook?
          </label>
          <input
            id="query"
            type="text"
            className="p-2 border border-gray-300 rounded w-full"
            value={query}
            placeholder="Pasta"
            onChange={handleInputChange(setQuery)}
          />
        </div>

        <div className="flex flex-col w-full sm:w-auto">
          <label htmlFor="cuisine" className="mb-1">
            What cuisine is it?
          </label>
          <select
            id="cuisine"
            className="p-2 border border-gray-300 rounded w-full"
            value={cuisine}
            onChange={handleInputChange(setCuisine)}
          >
            <option value="">Cuisine</option>
            <option value="African">African</option>
            <option value="Asian">Asian</option>
            <option value="Indian">Indian</option>
            <option value="Italian">Italian</option>
            <option value="Mexican">Mexican</option>
          </select>
        </div>

        <div className="flex flex-col w-full sm:w-auto">
          <label htmlFor="time" className="mb-1">
            How many time MAX should it take?
          </label>
          <input
            id="time"
            type="number"
            min="3"
            className="p-2 border border-gray-300 rounded w-full"
            value={maxReadyTime}
            placeholder="20"
            onChange={handleInputChange(setMaxReadyTime)}
          />
        </div>

        <button
          onClick={handleSearchRecipe}
          className={`self-center sm:self-auto ${
            !hasFilters ? "text-gray-300" : "text-amber-900"
          }`}
          disabled={!hasFilters}
        >
          Next
        </button>
      </div>
    </div>
  );
}
