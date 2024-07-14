"use client";

import Image from "next/image";
import applePie from "@/public/apple-pie.jpg";
import pasta from "@/public/pasta.jpg";
import rice from "@/public/rice.jpg";
import { useState } from "react";
import { getFoodRecipe } from "@/services/RecipeService";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const latestFoods = [
  {
    img: pasta,
    name: "Pasta",
  },
  {
    img: rice,
    name: "Rice",
  },
  {
    img: applePie,
    name: "Pie",
  },
];

const LatestRecipes = () => {
  const [data, setData] = useState(null);

  const handleGetRecipe = async (food) => {
    const foodToLowerCase = food.toLowerCase();
    try {
      const response = await getFoodRecipe(foodToLowerCase);
      setData(response.results[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <div>
      <div className="mt-20">
        <p className="text-2xl mb-5">Latest Recipes</p>
        <Dialog>
          <DialogTrigger>
            <div className="grid grid-cols-3 gap-6">
              {latestFoods.map((item, index) => (
                <div
                  key={index}
                  className="hover:cursor-pointer"
                  onClick={() => handleGetRecipe(item.name)}
                >
                  <Image
                    src={item.img}
                    className="rounded-lg"
                    width="850"
                    height="850"
                    alt="apple pie"
                  />
                  <p className="mt-4">{item.name}</p>
                </div>
              ))}
            </div>
          </DialogTrigger>
          <DialogContent className="max-h-[95vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{data?.title}</DialogTitle>
              <DialogDescription>
                <img
                  src={data?.image}
                  className="rounded-lg"
                  width="250"
                  height="250"
                  alt={data?.title}
                />
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
  );
};

export default LatestRecipes;
