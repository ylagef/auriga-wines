import { createClient } from "@/utils/supabase/server";
import React from "react";
import NameUpdateRow from "@/components/NameUpdateRow";
import { updateCellar } from "@/actions/cellar";

async function CellarsPage() {
  const supabase = createClient();

  const { data: cellars } = await supabase.from("cellars").select("id, name");

  return (
    <div className="flex flex-col items-center w-full gap-2 p-4">
      <h1 className="mb-4 text-xl font-bold">Bodegas</h1>
      {cellars
        ?.sort((a, z) => a.name.localeCompare(z.name))
        .map((cellar) => (
          <NameUpdateRow
            key={cellar.id}
            element={cellar}
            action={updateCellar}
          />
        ))}
    </div>
  );
}

export default CellarsPage;
