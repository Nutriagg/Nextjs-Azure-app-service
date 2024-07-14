"use client";

import { useEffect, useState } from "react";
import { getRandomRecipe } from "@/services/RecipeService";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Hero = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const handleGetRandomRecipe = async () => {
      try {
        const response = await getRandomRecipe();
        setData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    handleGetRandomRecipe();
  }, []);
  return (
    <div className="flex my-10 items-center gap-10">
      <img src={data?.recipes[0]?.image} width="850" height="850" alt={data?.recipes[0]?.title} />
      <div>
        <p className="text-sm text-slate-400">TRENDING RECIPE</p>
        <p className="text-2xl font-medium">{data?.recipes[0]?.title}</p>
        <Dialog>
          <DialogTrigger>
            <p className="underline">View recipe</p>
          </DialogTrigger>
          <DialogContent className="max-h-[95vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{data?.recipes[0]?.title}</DialogTitle>
              <DialogDescription>
                <p className="font-medium text-black text-lg my-2">Ingredients</p>
                <ul>
                  {data?.recipes[0]?.extendedIngredients?.map((ingredient, index) => (
                    <li key={index}>{ingredient?.original}</li>
                  ))}
                </ul>
                <p className="font-medium text-black text-lg my-2">Steps</p>
                <ul>
                  {data?.recipes[0]?.analyzedInstructions[0]?.steps?.map((steps, index) => (
                    <li key={index}>{steps?.step}</li>
                  ))}
                </ul>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Hero;
