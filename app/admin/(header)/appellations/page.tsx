import { createClient } from "@/utils/supabase/server";
import React from "react";
import NameUpdateRow from "@/components/NameUpdateRow";
import { updateAppellation } from "@/actions/appellation";

async function AppellationsPage() {
  const supabase = createClient();

  const { data: appellations } = await supabase
    .from("appellations")
    .select("id, name");

  return (
    <div className="flex flex-col items-center w-full gap-2 p-4">
      <h1 className="mb-4 text-xl font-bold">Zonas</h1>
      {!appellations?.length && (
        <p className="text-gray-500">Aún no hay zonas registradas</p>
      )}
      {appellations
        ?.sort((a, z) => a.name.localeCompare(z.name))
        .map((appellation) => (
          <NameUpdateRow
            key={appellation.id}
            element={appellation}
            action={updateAppellation}
          />
        ))}
    </div>
  );
}

export default AppellationsPage;
