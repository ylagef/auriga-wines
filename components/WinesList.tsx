import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import { Badge } from "./ui/Badge";
import Skeleton from "react-loading-skeleton";
import { Database } from "@/utils/supabase/types";

type Wine = Database["public"]["Tables"]["wines"]["Row"];

export const WinesList = async ({
  countries,
  grapes,
  sortBy,
}: {
  countries?: string;
  grapes?: string;
  sortBy?: "price_asc" | "price_desc" | "year_asc" | "year_desc";
}) => {
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  const supabase = createClient();

  const query = supabase
    .from("wines")
    .select("id, name, description, price, year, photo_url, photo_size");

  if (countries) query.eq("country_id", countries);
  // Grapes is an array of numbers, check if included
  if (grapes) query.in("grapes", [grapes]);
  if (sortBy)
    query.order(sortBy.split("_")[0], { ascending: sortBy.includes("asc") });

  const { data: wines, error } = await query;
  console.error({ error });

  return (
    <div className="z-0 grid justify-center w-full grid-cols-3 gap-8 scroll-smooth">
      {wines?.map((wine) => {
        console.log({ wine });
        const size = wine.photo_size as { width: number; height: number };
        return (
          <Link
            href={`/wines/${wine.id}`}
            key={wine.id}
            className="relative flex flex-col items-center gap-2 animate-fade-in"
          >
            <Badge variant="secondary" className="absolute top-0 right-0">
              {wine.year}
            </Badge>

            <Image
              src={`https://jacopngdwpoypvunhunq.supabase.co/storage/v1/object/public/wines/w${wine.photo_url}`}
              alt={wine.name}
              width={size.width || 100}
              height={size.height || 100}
              className="object-contain h-60"
            />

            <h3 className="text-sm font-bold text-center">{wine.name}</h3>
            <div className="grid grow place-items-center">
              <p className="text-xs text-center text-gray-600">
                {wine.description}
              </p>
            </div>
            <span>
              {Intl.NumberFormat("es-ES", {
                style: "currency",
                currency: "EUR",
              }).format(wine.price)}
            </span>
          </Link>
        );
      })}
    </div>
  );
};
