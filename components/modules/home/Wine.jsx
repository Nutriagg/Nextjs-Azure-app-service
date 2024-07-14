"use client";

import Image from "next/image";
import redWine from "@/public/red-wine.jpg";
import whiteWine from "@/public/white-wine.jpg";
import champagne from "@/public/champagne.jpg";
import { useState } from "react";
import { getWinePairing } from "@/services/WineService";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const wineCollection = [
  {
    img: whiteWine,
    category: "Dry White Wine",
    name: "Assyrtiko",
  },
  {
    img: redWine,
    category: "Dry Red Wine",
    name: "Malbec",
  },
  {
    img: champagne,
    category: "Sparkling Wine",
    name: "Champagne",
  },
];

const Wine = () => {
  const [data, setData] = useState(null);

  const handleGetWinePairing = async (wine) => {
    const wineToLowerCase = wine.toLowerCase();
    try {
      const response = await getWinePairing(wineToLowerCase);
      setData(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <div className="mt-20">
      <p className="text-2xl mb-5">Foods Paired With Wine</p>

      <Dialog>
        <DialogTrigger>
          <div className="grid grid-cols-3 gap-6">
            {wineCollection.map((item, index) => (
              <div
                key={index}
                className="hover:cursor-pointer"
                onClick={() => handleGetWinePairing(item.name)}
              >
                <Image
                  className="rounded-lg"
                  src={item.img}
                  width="850"
                  height="650"
                  alt={item.name}
                />
                <p className="text-sm text-slate-400 my-2">Category: {item.category}</p>
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Food Pairings</DialogTitle>
            <DialogDescription>
              <ul>
                {data?.pairings?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <p className="text-black mt-2">{data?.text}</p>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Wine;
