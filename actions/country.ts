"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const updateCountry = async (_: any, formData: FormData) => {
  const supabase = createClient();

  const country = {
    id: Number(formData.get("id")),
    name: formData.get("name") as string,
  };

  const { data, error, count, status, statusText } = await supabase
    .from("countries")
    .update({ name: country.name, updated_at: new Date().toISOString() })
    .eq("id", country.id)
    .select();

  if (error) {
    console.error("Error inserting wine", error);

    if (error.code === "23505")
      return { errors: { name: ["Ya existe un país con este nombre."] } };

    return {
      errors: { general: [`Error actualizando => ${error.message}`] },
    };
  }

  console.log(data, error, count, status, statusText);
  revalidatePath(`/admin/countries`);
  return { success: true };
};
