import { SearchParams } from "@/app/wines/page";
import { WineWithForeign } from "@/utils/supabase/parsedTypes";
import { createClient } from "@/utils/supabase/server";
import { WineElement } from "./WineElement";

export const WinesList = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const {
    countries,
    grapes,
    appellations,
    cellars,
    sortBy,
    name,
    from_price,
    to_price,
    from_year,
    to_year,
    tags,
    types,
  } = searchParams;

  await new Promise((resolve) => setTimeout(resolve, 2000));
  const supabase = createClient();

  let queryString =
    "*, cellar:cellar_id(id, name), type:type_id(id, name), country:country_id(id, name), appellation:appellation_id(id, name)";

  queryString += grapes?.length
    ? ", grapes:wines_grapes!inner(wine_id, grape_id, grape:grape_id(id, name))"
    : ", grapes:wines_grapes(wine_id, grape_id, grape:grape_id(id, name))";

  queryString += tags?.length
    ? ", tags:wines_tags!inner(wine_id, tag_id, tag:tag_id(id, name, style))"
    : ", tags:wines_tags(wine_id, tag_id, tag:tag_id(id, name, style))";

  const query = supabase.from("wines").select(queryString).eq("active", true);

  console.log(grapes);
  if (countries?.length) query.in("country_id", countries.split(","));
  if (appellations?.length) query.in("appellation_id", appellations.split(","));
  if (cellars?.length) query.in("cellar_id", cellars.split(","));
  if (name?.length) query.ilike("name", `%${name}%`);
  if (from_price?.length) query.gte("price", from_price);
  if (to_price?.length) query.lte("price", to_price);
  if (from_year?.length) query.gte("year", from_year);
  if (to_year?.length) query.lte("year", to_year);
  if (types?.length) query.in("type_id", types.split(","));
  if (grapes?.length) query.in("grapes.grape_id", grapes.split(","));
  if (tags?.length) query.in("tags.tag_id", tags.split(","));

  if (sortBy?.length) {
    query.order(sortBy.split(/_(asc|desc)/)[0], {
      ascending: sortBy.includes("asc"),
    });
  } else {
    query.order("name", {
      ascending: true,
    });
  }

  const { data: wines, error } = await query.returns<WineWithForeign[]>();
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
      {wines.map((wine, index) => {
        const safeWine: WineWithForeign = {
          ...wine,
          tags: wine.tags || [],
          grapes: wine.grapes || [],
        };
        return (
          <WineElement
            key={wine.id}
            wine={safeWine}
            parsedSearchParams={parsedSearchParams}
            priority={index < 6}
          />
        );
      })}
    </div>
  );
};
