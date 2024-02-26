import { SearchParams } from "@/app/wines/page";
import { createClient } from "@/utils/supabase/server";
import { Database } from "@/utils/supabase/types";
import { WineElement } from "./WineElement";

export const WinesList = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const {
    countries,
    grapes,
    regions,
    cellars,
    apellations,
    sortBy,
    name,
    from_price,
    to_price,
    from_year,
    to_year,
    tags,
  } = searchParams;

  await new Promise((resolve) => setTimeout(resolve, 2000));
  const supabase = createClient();

  const query = supabase
    .from("wines")
    .select(
      "id, name, description, price, year, photo_url, photo_size, grapes, tags, apellation:apellation_id(name), country:country_id(name), region:region_id(name)"
    );

  if (countries?.length) query.in("country_id", countries.split(","));
  if (grapes?.length) query.contains("grapes", grapes.split(","));
  if (tags?.length) query.contains("tags", tags.split(","));
  if (regions?.length) query.in("region_id", regions.split(","));
  if (cellars?.length) query.in("cellar_id", cellars.split(","));
  if (apellations?.length) query.in("apellation_id", apellations.split(","));
  if (name?.length) query.ilike("name", `%${name}%`);
  if (from_price?.length) query.gte("price", from_price);
  if (to_price?.length) query.lte("price", to_price);
  if (from_year?.length) query.gte("year", from_year);
  if (to_year?.length) query.lte("year", to_year);

  if (sortBy?.length) {
    query.order(sortBy.split(/_(asc|desc)/)[0], {
      ascending: sortBy.includes("asc"),
    });
  }

  const tagsQuery = supabase.from("tags").select("id, name, style");

  const [{ data: wines }, { data: tagsData }] = await Promise.all([
    query.returns<
      (Database["public"]["Tables"]["wines"]["Row"] & {
        apellation: { name: string };
        country: { name: string };
        region: { name: string };
      })[]
    >(),
    tagsQuery,
  ]);

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

  const parsedSearchParams = new URLSearchParams(
    searchParams as Record<string, string>
  ).toString();

  return (
    <div className="z-0 grid justify-center w-full grid-cols-1 gap-10 px-2 sm:grid-cols-2 md:grid-cols-3 scroll-smooth">
      {wines.map((wine, index) => (
        <WineElement
          key={wine.id}
          wine={wine}
          tags={tagsData}
          parsedSearchParams={parsedSearchParams}
          priority={index < 6}
        />
      ))}
    </div>
  );
};
