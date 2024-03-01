import { createClient } from "@/utils/supabase/server";
import React from "react";
import NameUpdateRow from "@/components/NameUpdateRow";
import { updateZone } from "@/actions/zone";

async function ZonesPage() {
  const supabase = createClient();

  const { data: zones } = await supabase.from("zones").select("id, name");

  return (
    <div className="flex flex-col items-center w-full gap-2 p-4">
      <h1 className="mb-4 text-xl font-bold">Zonas</h1>
      {!zones?.length && (
        <p className="text-gray-500">Aún no hay zonas registradas</p>
      )}
      {zones
        ?.sort((a, z) => a.name.localeCompare(z.name))
        .map((zone) => (
          <NameUpdateRow key={zone.id} element={zone} action={updateZone} />
        ))}
    </div>
  );
}

export default ZonesPage;
