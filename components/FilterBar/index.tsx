import { createClient } from "@/utils/supabase/server";

import React from "react";
import FilterBarComponent from "./component";

async function FilterBar() {
  const supabase = createClient();

  const countriesQuery = supabase.from("countries").select("id, name");
  const grapesQuery = supabase.from("grapes").select("id, name");
  const appellationsQuery = supabase.from("appellations").select("id, name");
  const cellarsQuery = supabase.from("cellars").select("id, name");
  const typesQuery = supabase.from("types").select("id, name");
  const maxWinePriceQuery = supabase
    .from("wines")
    .select("price")
    .order("price", { ascending: false })
    .limit(1);
  const maxYearsQuery = supabase
    .from("wines")
    .select("year")
    .order("year", { ascending: true })
    .limit(1);

  const tagsQuery = supabase.from("tags").select("id, name");

  // Promise all
  const [
    { data: countries },
    { data: grapes },
    { data: appellations },
    { data: cellars },
    { data: maxWinePrice },
    { data: maxYears },
    { data: tags },
    { data: types },
  ] = await Promise.all([
    countriesQuery,
    grapesQuery,
    appellationsQuery,
    cellarsQuery,
    maxWinePriceQuery,
    maxYearsQuery,
    tagsQuery,
    typesQuery,
  ]);

  return (
    <FilterBarComponent
      countries={countries}
      grapes={grapes}
      appellations={appellations}
      cellars={cellars}
      maxWinePrice={maxWinePrice}
      maxYears={maxYears}
      tags={tags}
      types={types}
    />
  );
}

export default FilterBar;
