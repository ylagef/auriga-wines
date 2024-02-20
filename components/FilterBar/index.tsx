import { createClient } from "@/utils/supabase/server";

import React from "react";
import FilterBarComponent from "./component";

async function FilterBar() {
  const supabase = createClient();

  const countriesQuery = supabase.from("countries").select("id, name");
  const grapesQuery = supabase.from("grapes").select("id, name");
  const regionsQuery = supabase.from("regions").select("id, name");
  const pairingsQuery = supabase.from("pairings").select("id, name");
  const cellarsQuery = supabase.from("cellars").select("id, name");
  const apellationsQuery = supabase.from("apellations").select("id, name");

  // Promise all
  const [
    { data: countries, error: countriesError },
    { data: grapes, error: grapesError },
    { data: regions, error: regionsError },
    { data: pairings, error: pairingsError },
    { data: cellars, error: cellarsError },
    { data: apellations, error: apellationsError },
  ] = await Promise.all([
    countriesQuery,
    grapesQuery,
    regionsQuery,
    pairingsQuery,
    cellarsQuery,
    apellationsQuery,
  ]);

  console.log({ countries, grapes, regions, pairings, cellars, apellations });
  console.log({
    countriesError,
    grapesError,
    regionsError,
    pairingsError,
    cellarsError,
    apellationsError,
  });

  return (
    <FilterBarComponent
      countries={countries}
      grapes={grapes}
      regions={regions}
      pairings={pairings}
      cellars={cellars}
      apellations={apellations}
    />
  );
}

export default FilterBar;
