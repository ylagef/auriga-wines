"use server";

import { Wine, WineDB } from "@/utils/supabase/parsedTypes";
import { createClient } from "@/utils/supabase/server";
import { md5 } from "js-md5";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
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

const getWineObject = (formData: FormData): Partial<WineDB> => {
  console.log("Getting wine object");
  const wine: Partial<WineDB> = {
    id: formData.get("id") ? Number(formData.get("id") as string) : undefined,
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    price: Number(formData.get("price")),
    year: Number(formData.get("year")),
    grapes: formData.getAll("grape").map(Number) || [],
    country_id: Number(formData.get("country")),
    region_id: Number(formData.get("region")),
    apellation_id: Number(formData.get("apellation")),
    cellar_id: Number(formData.get("cellar")),
    active: formData.get("active") === "on",
    new: formData.get("new") === "on",
  };

  return wine;
};

const handleNewObjects = async (wine: Partial<Wine>, formData: FormData) => {
  const tasks = [];

  const newGrapes = formData.getAll("new-grape") as string[];
  if (newGrapes.length > 0) {
    tasks.push(
      (async () => {
        console.log("Promise newGrapes running...");
        const newGrapesData = await handleAddNewGrapes(newGrapes);
        const newGrapesIds = newGrapesData?.map((grape) => grape.id) || [];
        wine.grapes = [...(wine.grapes || []), ...newGrapesIds];
        console.log("Promise newGrapes end", wine.grapes);
      })()
    );
  }

  const newCountry = formData.get("new-country") as string;
  if (newCountry) {
    tasks.push(
      (async () => {
        console.log("Promise newCountry running...");
        const newCountryData = await handleAddNewElement(
          "countries",
          newCountry
        );
        if (!newCountryData) throw new Error("Error creating new country");
        wine.country_id = newCountryData[0].id;
        console.log("Promise newCountry end", wine.country_id);
      })()
    );
  }

  const newRegion = formData.get("new-region") as string;
  if (newRegion) {
    tasks.push(
      (async () => {
        console.log("Promise newRegion running...");
        const newRegionData = await handleAddNewElement("regions", newRegion);
        if (!newRegionData) throw new Error("Error creating new region");
        wine.region_id = newRegionData[0].id;
        console.log("Promise newRegion end", wine.region_id);
      })()
    );
  }

  const newApellation = formData.get("new-apellation") as string;
  if (newApellation) {
    tasks.push(
      (async () => {
        console.log("Promise newApellation running...");
        const newApellationData = await handleAddNewElement(
          "apellations",
          newApellation
        );
        if (!newApellationData)
          throw new Error("Error creating new apellation");
        wine.apellation_id = newApellationData[0].id;
        console.log("Promise newApellation end", wine.apellation_id);
      })()
    );
  }

  const newCellar = formData.get("new-cellar") as string;
  if (newCellar) {
    tasks.push(
      (async () => {
        console.log("Promise newCellar running...");
        const newCellarData = await handleAddNewElement("cellars", newCellar);
        if (!newCellarData) throw new Error("Error creating new cellar");
        wine.cellar_id = newCellarData[0].id;
        console.log("Promise newCellar end", wine.cellar_id);
      })()
    );
  }

  return Promise.all(tasks);
};

const handlePhotoUpload = async (photo: File, wine: WineDB) => {
  const supabase = createClient();

  console.log("Uploading photo", photo, `${wine.id}-${photo.name}`);
  const extension = photo.name.split(".").pop();
  const md5Id = md5.create().update(`${wine.id}`).hex();

  const { data: photoData, error: photoError } = await supabase.storage
    .from("wines")
    .upload(`${md5Id}.${extension}`, photo);
  console.log({ photoData, photoError });
  if (!photoData) return "Error uploading photo";

  const buffer = await photo.arrayBuffer();
  const metadata = await sharp(Buffer.from(buffer)).metadata();
  console.log(`Image dimensions are ${metadata.width}x${metadata.height}`);

  const { data: wineData, error: wineError } = await supabase
    .from("wines")
    .update({
      photo_url: photoData?.path,
      photo_size: {
        width: metadata.width || 0,
        height: metadata.height || 0,
      },
    })
    .eq("id", wine.id)
    .select();

  console.log({ wineData, wineError });
};

export const createWine = async (formData: FormData) => {
  const supabase = createClient();

  const wine = getWineObject(formData);

  await handleNewObjects(wine, formData);

  const { data, error } = await supabase
    .from("wines")
    .insert(wine as WineDB)
    .select();
  console.log({ data, error });

  const insertedWine = data?.[0];
  if (!insertedWine) throw new Error("Error creating wine");

  const photo = formData.get("photo") as File;
  if (photo.size > 0) {
    await handlePhotoUpload(photo, insertedWine);
  }

  revalidatePaths();
  console.log({ data, error });
  redirect(`/admin/wines`);
};

export const updateWine = async (formData: FormData) => {
  const supabase = createClient();
  const wine = getWineObject(formData);

  await handleNewObjects(wine, formData);

  console.log({ wine });

  if (!wine.id) throw new Error("Wine id is required");

  const { data, error, count, status, statusText } = await supabase
    .from("wines")
    .update(wine)
    .eq("id", wine.id)
    .select();

  const photo = formData.get("photo") as File;
  console.log({ photo });
  if (photo.size > 0) {
    await handlePhotoUpload(photo, data?.[0] as WineDB);
  }

  console.log({ data, error, count, status, statusText });
  revalidatePaths();
  redirect(`/admin/wines`);
};

export const deleteWine = async (wine: Wine) => {
  const supabase = createClient();
  console.log("Deleting wine", wine);
  const { data, error } = await supabase
    .from("wines")
    .delete()
    .eq("id", wine.id);
  console.log({ data, error });

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
