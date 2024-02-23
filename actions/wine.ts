"use server";

import { Wine } from "@/utils/supabase/parsedTypes";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import sharp from "sharp";

const revalidatePaths = () => {
  revalidatePath("/admin/wines");
  revalidatePath("/wines");
};

const handleAddNewGrapes = async (newGrapes: string[]) => {
  const supabase = createClient();
  const newGrapesArray = newGrapes.map((name) => ({ name }));
  const { data, error } = await supabase
    .from("grapes")
    .insert(newGrapesArray)
    .select();

  return data;
};

const handleAddNewElement = async (table: string, name: string) => {
  const supabase = createClient();
  const { data, error } = await supabase.from(table).insert({ name }).select();
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
    active: formData.get("active") === "on",
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
    if (!newCountryData) return "Error creating new country";
    wine.country_id = newCountryData[0].id;
  }

  const newRegion = formData.get("new-region") as string;
  if (newRegion) {
    const newRegionData = await handleAddNewElement("regions", newRegion);
    if (!newRegionData) return "Error creating new region";
    wine.region_id = newRegionData[0].id;
  }

  const newApellation = formData.get("new-apellation") as string;
  if (newApellation) {
    const newApellationData = await handleAddNewElement(
      "apellations",
      newApellation
    );
    if (!newApellationData) return "Error creating new apellation";
    wine.apellation_id = newApellationData[0].id;
  }

  const newCellar = formData.get("new-cellar") as string;
  if (newCellar) {
    const newCellarData = await handleAddNewElement("cellars", newCellar);
    if (!newCellarData) return "Error creating new cellar";
    wine.cellar_id = newCellarData[0].id;
  }

  const { data, error } = await supabase.from("wines").insert(wine).select();
  console.log({ data, error });
  if (!data?.[0]) return "Error creating wine";
  const insertedWine = data[0];

  const photo = formData.get("photo") as File;
  if (photo) {
    console.log("Uploading photo", photo, `${insertedWine.id}-${photo.name}`);
    const { data: photoData, error: photoError } = await supabase.storage
      .from("wines")
      .upload(`${insertedWine.id}-${photo.name}`, photo);
    console.log({ photoData, photoError });
    if (!photoData) return "Error uploading photo";

    const buffer = await photo.arrayBuffer();
    const metadata = await sharp(Buffer.from(buffer)).metadata();
    console.log(`Image dimensions are ${metadata.width}x${metadata.height}`);

    // Update wine with photo data
    const { data: wineData, error: wineError } = await supabase
      .from("wines")
      .update({
        photo_url: photoData?.path,
        photo_size: {
          width: metadata.width || 0,
          height: metadata.height || 0,
        },
      })
      .eq("id", insertedWine.id)
      .select();

    revalidatePaths();

    console.log({ wineData, wineError });
    return wineData;
  }

  revalidatePaths();
  console.log({ data, error });
  return data;
};

export const updateWine = async (formData: FormData) => {
  const supabase = createClient();
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
    photo_url: "",
    photo_size: { width: 0, height: 0 },
    active: formData.get("active") === "on",
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
  revalidatePaths();
};

export const deleteWine = async (wine: Wine) => {
  const supabase = createClient();
  console.log("Deleting wine", wine);
  const { data, error } = await supabase
    .from("wines")
    .delete()
    .eq("id", wine.id);
  console.log({ data, error });

  // Remove the image if exists
  if (wine.photo_url) {
    console.log("Removing photo", wine.photo_url);
    const { data: photoData, error: photoError } = await supabase.storage
      .from("wines")
      .remove([wine.photo_url]);
    console.log({ photoData, photoError });
  }

  revalidatePaths();
};

export const toggleActiveWine = async (id: number, value: boolean) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("wines")
    .update({ active: value })
    .eq("id", id)
    .select();
  console.log({ data, error });
  revalidatePaths();
};
