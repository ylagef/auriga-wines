import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/Badge";
import { SearchParams } from "@/app/wines/page";
import { Database } from "@/utils/supabase/types";

export const WinesList = async ({
  countries,
  grapes,
  regions,
  pairings,
  cellars,
  appellations,
  sortBy,
  name,
  from_price,
  to_price,
}: SearchParams) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const supabase = createClient();

  const query = supabase
    .from("wines")
    .select(
      "id, name, description, price, year, photo_url, photo_size, grapes, new, apellation:apellation_id(name), country:country_id(name), region:region_id(name)"
    );

  if (countries?.length) query.in("country_id", countries.split(","));
  // Grapes is an array of numbers, check if included
  if (grapes?.length) query.containedBy("grapes", grapes.split(","));
  if (regions?.length) query.in("region_id", regions.split(","));
  if (pairings?.length) query.containedBy("pairings", pairings.split(","));
  if (cellars?.length) query.in("cellar_id", cellars.split(","));
  if (appellations?.length) query.in("appellation_id", appellations.split(","));
  if (name?.length) query.ilike("name", `%${name}%`);
  if (from_price?.length) query.gte("price", from_price);
  if (to_price?.length) query.lte("price", to_price);

  if (sortBy?.length) {
    query.order(sortBy.split(/_(asc|desc)/)[0], {
      ascending: sortBy.includes("asc"),
    });
  }

  const { data: wines } = await query.returns<
    (Database["public"]["Tables"]["wines"]["Row"] & {
      apellation: { name: string };
      country: { name: string };
      region: { name: string };
    })[]
  >();

  if (!wines?.length) {
    return (
      <div className="flex flex-col items-center justify-center w-full gap-2 mt-10 animate-fade-in">
        <p className="text-center">
          Aún no disponemos de vinos con estos criterios de búsqueda.
        </p>
        <p className="text-sm text-center">
          Cambia los filtros o consulta a nuestros empleados.
        </p>
      </div>
    );
  }

  return (
    <div className="z-0 grid justify-center w-full grid-cols-1 gap-10 px-2 sm:grid-cols-2 md:grid-cols-3 scroll-smooth">
      {wines.map((wine, index) => {
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
              priority={index < 6}
            />

            <div className="flex flex-wrap items-center justify-center gap-1">
              {wine.country && (
                <Badge variant="outline">{wine.country.name}</Badge>
              )}

              {wine.apellation && (
                <Badge variant="outline">{wine.apellation.name}</Badge>
              )}
            </div>

            <h3 className="font-bold text-center">{wine.name}</h3>

            <span className="text-sm">
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
