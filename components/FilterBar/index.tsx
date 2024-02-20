import { createClient } from "@/utils/supabase/server";

import React from "react";
import FilterBarComponent from "./component";

async function FilterBar({
  searchParams,
}: {
  searchParams: {
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
  };
}) {
  const supabase = createClient();

  const countriesQuery = supabase.from("countries").select("id, name");
  const grapesQuery = supabase.from("grapes").select("id, name");
  const regionsQuery = supabase.from("regions").select("id, name");
  const pairingsQuery = supabase.from("pairings").select("id, name");
  const cellarsQuery = supabase.from("cellars").select("id, name");
  const apellationsQuery = supabase.from("apellations").select("id, name");

  // Promise all
  const [
    { data: countries },
    { data: grapes },
    { data: regions },
    { data: pairings },
    { data: cellars },
    { data: apellations },
  ] = await Promise.all([
    countriesQuery,
    grapesQuery,
    regionsQuery,
    pairingsQuery,
    cellarsQuery,
    apellationsQuery,
  ]);

  return (
    <FilterBarComponent
      countries={countries}
      grapes={grapes}
      regions={regions}
      pairings={pairings}
      cellars={cellars}
      apellations={apellations}
      searchParams={searchParams}
    />
  );
}

export default FilterBar;
