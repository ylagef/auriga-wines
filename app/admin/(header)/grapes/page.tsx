import { createClient } from "@/utils/supabase/server";
import React from "react";
import NameUpdateRow from "@/components/NameUpdateRow";
import { updateGrape } from "@/actions/grape";

async function GrapesPage() {
  const supabase = createClient();

  const { data: grapes } = await supabase.from("grapes").select("id, name");

  return (
    <div className="flex flex-col items-center w-full gap-2 p-4">
      <h1 className="mb-4 text-xl font-bold">Uvas</h1>
      {!grapes?.length && (
        <p className="text-gray-500">Aún no hay uvas registradas</p>
      )}
      {grapes
        ?.sort((a, z) => a.name.localeCompare(z.name))
        .map((grape) => (
          <NameUpdateRow key={grape.id} element={grape} action={updateGrape} />
        ))}
    </div>
  );
}

export default GrapesPage;
