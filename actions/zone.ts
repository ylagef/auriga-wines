"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const updateZone = async (_: any, formData: FormData) => {
  const supabase = createClient();

  const zone = {
    id: Number(formData.get("id")),
    name: formData.get("name") as string,
  };

  const { data, error, count, status, statusText } = await supabase
    .from("zones")
    .update({ name: zone.name })
    .eq("id", zone.id)
    .select();

  if (error) {
    console.error("Error inserting wine", error);

    if (error.code === "23505")
      return { errors: { name: ["Ya existe una zona con este nombre."] } };

    return {
      errors: { general: [`Error actualizando => ${error.message}`] },
    };
  }

  console.log(data, error, count, status, statusText);
  revalidatePath(`/admin/zones`);
  return { success: true };
};
