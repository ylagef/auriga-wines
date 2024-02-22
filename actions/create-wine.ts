"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import sharp from "sharp";

const supabase = createClient();

const handleAddNewGrapes = async (newGrapes: string[]) => {
  const newGrapesArray = newGrapes.map((name) => ({ name }));
  const { data, error } = await supabase
    .from("grapes")
    .insert(newGrapesArray)
    .select();

  return data;
};

const handleAddNewElement = async (table: string, name: string) => {
  const { data, error } = await supabase.from(table).insert({ name }).select();
  console.log(table, { data, error });
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
    photo_url: "",
    photo_size: { width: 0, height: 0 },
  };

  const newGrapes = formData.getAll("new-grape") as string[];
  if (newGrapes.length > 0) {
    const newGrapesData = await handleAddNewGrapes(newGrapes);
    const newGrapesIds = newGrapesData?.map((grape) => grape.id) || [];
    wine.grapes = [...wine.grapes, ...newGrapesIds];
  }

  const newCountry = formData.get("new-country") as string;
  if (newCountry) {
    const newCountryData = await handleAddNewElement("countries", newCountry);
    if (!newCountryData) throw new Error("Error creating new country");
    wine.country_id = newCountryData[0].id;
  }

  const newRegion = formData.get("new-region") as string;
  if (newRegion) {
    const newRegionData = await handleAddNewElement("regions", newRegion);
    if (!newRegionData) throw new Error("Error creating new region");
    wine.region_id = newRegionData[0].id;
  }

  const newApellation = formData.get("new-apellation") as string;
  if (newApellation) {
    const newApellationData = await handleAddNewElement(
      "apellations",
      newApellation
    );
    if (!newApellationData) throw new Error("Error creating new apellation");
    wine.apellation_id = newApellationData[0].id;
  }

  const newCellar = formData.get("new-cellar") as string;
  if (newCellar) {
    const newCellarData = await handleAddNewElement("cellars", newCellar);
    if (!newCellarData) throw new Error("Error creating new cellar");
    wine.cellar_id = newCellarData[0].id;
  }

  const photo = formData.get("photo") as File;
  if (photo) {
    const { data: photoData, error: photoError } = await supabase.storage
      .from("wines")
      .upload(`${wine.name}-${photo.name}`, photo, {
        cacheControl: "3600",
        upsert: false,
      });
    console.log({ photoData, photoError });
    if (!photoData) throw new Error("Error uploading photo");

    const buffer = await photo.arrayBuffer();
    const metadata = await sharp(Buffer.from(buffer)).metadata();
    console.log(`Image dimensions are ${metadata.width}x${metadata.height}`);

    wine.photo_url = photoData?.path;
    wine.photo_size = {
      width: metadata.width || 0,
      height: metadata.height || 0,
    };
  }

  const { data, error } = await supabase.from("wines").insert(wine).select();

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
  const { data, error } = await supabase.from("wines").delete().eq("id", id);

  console.log({ data, error });
  revalidatePath("/admin/wines");
  revalidatePath("/wines");
};
