import { createClient } from "@/utils/supabase/server";
import React from "react";
import NameUpdateRow from "@/components/NameUpdateRow";
import { updateType } from "@/actions/type";

async function TypesPage() {
  const supabase = createClient();

  const { data: types } = await supabase.from("types").select("id, name");

  return (
    <div className="flex flex-col items-center w-full gap-2 p-4">
      <h1 className="mb-4 text-xl font-bold">Tipos</h1>
      {!types?.length && (
        <p className="text-gray-500">Aún no hay tipos registradas</p>
      )}
      {types
        ?.sort((a, z) => a.name.localeCompare(z.name))
        .map((type) => (
          <NameUpdateRow key={type.id} element={type} action={updateType} />
        ))}
    </div>
  );
}

export default TypesPage;
