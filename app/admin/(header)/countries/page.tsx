import { createClient } from "@/utils/supabase/server";
import React from "react";
import NameUpdateRow from "@/components/NameUpdateRow";
import { updateCountry } from "@/actions/country";

async function CountriesPage() {
  const supabase = createClient();

  const { data: countries } = await supabase
    .from("countries")
    .select("id, name");

  return (
    <div className="flex flex-col items-center w-full gap-2 p-4">
      <h1 className="mb-4 text-xl font-bold">Países</h1>
      {!countries?.length && (
        <p className="text-gray-500">Aún no hay países registradas</p>
      )}
      {countries
        ?.sort((a, z) => a.name.localeCompare(z.name))
        .map((country) => (
          <NameUpdateRow
            key={country.id}
            element={country}
            action={updateCountry}
          />
        ))}
    </div>
  );
}

export default CountriesPage;
