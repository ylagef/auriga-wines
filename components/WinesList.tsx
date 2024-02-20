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
  regions,
  pairings,
  cellars,
  appellations,
  sortBy,
}: {
  countries?: string;
  grapes?: string;
  regions?: string;
  pairings?: string;
  cellars?: string;
  appellations?: string;
  sortBy?:
    | "price_asc"
    | "price_desc"
    | "year_asc"
    | "year_desc"
    | "created_at_asc"
    | "created_at_desc";
}) => {
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  const supabase = createClient();

  const query = supabase
    .from("wines")
    .select(
      "id, name, description, price, year, photo_url, photo_size, grapes, new"
    );

  if (countries?.length) query.in("country_id", countries.split(","));
  // Grapes is an array of numbers, check if included
  if (grapes?.length) query.containedBy("grapes", grapes.split(","));
  if (regions?.length) query.in("region_id", regions.split(","));
  if (pairings?.length) query.containedBy("pairings", pairings.split(","));
  if (cellars?.length) query.in("cellar_id", cellars.split(","));
  if (appellations?.length) query.in("appellation_id", appellations.split(","));

  if (sortBy?.length)
    query.order(sortBy.split(/_(asc|desc)/)[0], {
      ascending: sortBy.includes("asc"),
    });

  const { data: wines, error } = await query;
  const grapesArrayUnique = Array.from(
    new Set(wines?.map((wine) => wine.grapes).flat())
  );

  const { data: grapesData, error: errorGrapes } = await supabase
    .from("grapes")
    .select("id, name")
    .in("id", grapesArrayUnique);

  return (
    <div className="z-0 grid justify-center w-full grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 scroll-smooth">
      {wines?.map((wine) => {
        const size = wine.photo_size as { width: number; height: number };
        return (
          <Link
            href={`/wines/${wine.id}`}
            key={wine.id}
            className="relative flex flex-col items-center gap-2 animate-fade-in"
          >
            {wine.new && (
              <Badge variant="default" className="absolute top-0 left-0">
                Nuevo
              </Badge>
            )}
            <Badge variant="secondary" className="absolute top-0 right-0">
              {wine.year}
            </Badge>

            <Image
              src={`https://jacopngdwpoypvunhunq.supabase.co/storage/v1/object/public/wines/${wine.photo_url}`}
              alt={wine.name}
              width={size.width || 100}
              height={size.height || 100}
              className="object-contain h-60"
            />

            <div className="flex flex-wrap items-center justify-center gap-1">
              {grapesData
                ?.filter((grape) => wine.grapes.includes(grape.id))
                .map((grape) => (
                  <Badge key={grape.id} variant="outline">
                    {grape.name}
                  </Badge>
                ))}
            </div>

            <h3 className="text-sm font-bold text-center grow">{wine.name}</h3>
            <div className="grid place-items-center">
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
