"use client";

import { getFoodRecipe } from "@/services/RecipeService";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const RecipeSearch = () => {
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    const foodToLowerCase = searchValue.toLowerCase();
    try {
      setLoading(true);
      const response = await getFoodRecipe(foodToLowerCase);
      setData(response.results[0]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <div>
      <div className="gap-5 flex mt-20 justify-center">
        <input
          placeholder="Search for a recipe"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="text-black rounded-full w-[60%] bg-slate-200 py-2 px-5"
        />
        <button
          disabled={loading}
          onClick={handleSearch}
          className="bg-purple-500 px-5 py-2 rounded-md"
        >
          Search
        </button>
      </div>
      {data && (
        <div className="flex gap-4 justify-center mb-8">
          <div>
            <img
              src={data?.image}
              className="rounded-lg my-5"
              width="250"
              height="250"
              alt={data?.title}
            />
            <p>{data?.title}</p>

            <Dialog>
              <DialogTrigger>
                <p className="underline">View recipe</p>
              </DialogTrigger>
              <DialogContent className="max-h-[95vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{data?.title}</DialogTitle>
                  <DialogDescription>
                    <p className="font-medium text-black text-lg my-2">Ingredients</p>
                    <ul>
                      {data?.extendedIngredients?.map((ingredient, index) => (
                        <li key={index}>{ingredient?.original}</li>
                      ))}
                    </ul>
                    <p className="font-medium text-black text-lg my-2">Steps</p>
                    <ul>
                      {data?.analyzedInstructions[0]?.steps?.map((steps, index) => (
                        <li key={index}>{steps?.step}</li>
                      ))}
                    </ul>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeSearch;
