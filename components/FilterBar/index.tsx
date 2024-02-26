import { createClient } from "@/utils/supabase/server";

import React from "react";
import FilterBarComponent from "./component";

async function FilterBar() {
  const supabase = createClient();

  const countriesQuery = supabase.from("countries").select("id, name");
  const grapesQuery = supabase.from("grapes").select("id, name");
  const regionsQuery = supabase.from("regions").select("id, name");
  const cellarsQuery = supabase.from("cellars").select("id, name");
  const apellationsQuery = supabase.from("apellations").select("id, name");
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
    { data: regions },
    { data: cellars },
    { data: apellations },
    { data: maxWinePrice },
    { data: maxYears },
    { data: tags },
  ] = await Promise.all([
    countriesQuery,
    grapesQuery,
    regionsQuery,
    cellarsQuery,
    apellationsQuery,
    maxWinePriceQuery,
    maxYearsQuery,
    tagsQuery,
  ]);

  return (
    <FilterBarComponent
      countries={countries}
      grapes={grapes}
      regions={regions}
      cellars={cellars}
      apellations={apellations}
      maxWinePrice={maxWinePrice}
      maxYears={maxYears}
      tags={tags}
    />
  );
}

export default FilterBar;
