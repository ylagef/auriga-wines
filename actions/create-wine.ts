"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

const handleAddNewGrapes = async (newGrapes: string[]) => {
  const supabase = createClient();
  const newGrapesArray = newGrapes.map((name) => ({ name }));
  const { data, error } = await supabase
    .from("grapes")
    .insert(newGrapesArray)
    .select();

  return data;
};

export const createWine = async (formData: FormData) => {
  const wine = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    price: Number(formData.get("price")),
    year: Number(formData.get("year")),
    grapes: formData.getAll("grape").map(Number),
    country_id: Number(formData.get("country")),
    region_id: Number(formData.get("region")),
    apellation_id: Number(formData.get("apellation")),
    cellar_id: Number(formData.get("cellar")),
    // photo: formData.get("photo") as string,
  };

  const newGrapes = formData.getAll("new-grape") as string[];
  if (newGrapes.length > 0) {
    const newGrapesData = await handleAddNewGrapes(newGrapes);
    const newGrapesIds = newGrapesData?.map((grape) => grape.id) || [];
    wine.grapes = [...wine.grapes, ...newGrapesIds];
  }

  const supabase = createClient();
  const { data, error } = await supabase.from("wines").insert(wine);

  console.log({ data, error });

  revalidatePath("/admin/wines");
  revalidatePath("/wines");

  return data;
};

export const updateWine = async (formData: FormData) => {
  const wine = {
    id: Number(formData.get("id")),
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    price: Number(formData.get("price")),
    year: Number(formData.get("year")),
    grapes: formData.getAll("grape").map(Number),
    country_id: Number(formData.get("country")),
    region_id: Number(formData.get("region")),
    apellation_id: Number(formData.get("apellation")),
    cellar_id: Number(formData.get("cellar")),
    // photo: formData.get("photo") as string,
  };
  const newGrapes = formData.getAll("new-grape") as string[];
  if (newGrapes.length > 0) {
    const newGrapesData = await handleAddNewGrapes(newGrapes);
    const newGrapesIds = newGrapesData?.map((grape) => grape.id) || [];
    wine.grapes = [...wine.grapes, ...newGrapesIds];
  }

  console.log({ wine });

  const supabase = createClient();
  const { data, error, count, status, statusText } = await supabase
    .from("wines")
    .update(wine)
    .eq("id", wine.id)
    .select();

  console.log({ data, error, count, status, statusText });
  revalidatePath("/admin/wines");
  revalidatePath("/wines");
};

export const deleteWine = async (id: number) => {
  const supabase = createClient();
  const { data, error } = await supabase.from("wines").delete().eq("id", id);

  console.log({ data, error });
  revalidatePath("/admin/wines");
  revalidatePath("/wines");
};
