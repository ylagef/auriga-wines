import { createClient } from "@/utils/supabase/server";
import React from "react";
import CellarRow from "./CellarRow";

async function CellarsPage() {
  const supabase = createClient();

  const { data: cellars } = await supabase.from("cellars").select("id, name");

  return (
    <div className="flex flex-col items-center w-full gap-2 p-4">
      <h1 className="text-xl font-bold">Bodegas</h1>
      {cellars
        ?.sort((a, z) => a.name.localeCompare(z.name))
        .map((cellar) => (
          <CellarRow key={cellar.id} cellar={cellar} />
        ))}
    </div>
  );
}

export default CellarsPage;
