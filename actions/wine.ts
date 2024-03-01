"use server";

import { Wine, WineDB } from "@/utils/supabase/parsedTypes";
import { createClient } from "@/utils/supabase/server";
import { md5 } from "js-md5";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import sharp from "sharp";
import { z } from "zod";

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
  const wine: Partial<
    Wine & {
      photo: File;
    }
  > = {
    id: formData.get("id") ? Number(formData.get("id")) : undefined,
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    price: formData.get("price") ? Number(formData.get("price")) : undefined,
    year: formData.get("year") ? Number(formData.get("year")) : undefined,
    grapes: formData.getAll("grape").map(Number) || [],
    country_id: formData.get("country")
      ? Number(formData.get("country"))
      : undefined,
    zone_id: formData.get("zone") ? Number(formData.get("zone")) : undefined,
    cellar_id: formData.get("cellar")
      ? Number(formData.get("cellar"))
      : undefined,
    active: formData.get("active") === "on",
    tags: formData.getAll("tag").map(Number) || [],
  };

  return wine;
};

const handleNewObjects = async (wine: Partial<Wine>, formData: FormData) => {
  const tasks = [];

  const newGrapes = formData.getAll("new-grape") as string[];
  if (newGrapes.length > 0) {
    tasks.push(
      (async () => {
        const newGrapesData = await handleAddNewGrapes(newGrapes);
        const newGrapesIds = newGrapesData?.map((grape) => grape.id) || [];
        wine.grapes = [...(wine.grapes || []), ...newGrapesIds];
      })()
    );
  }

  const newCountry = formData.get("new-country") as string;
  if (newCountry) {
    tasks.push(
      (async () => {
        const newCountryData = await handleAddNewElement(
          "countries",
          newCountry
        );
        if (!newCountryData)
          return { errors: { general: ["Error creating new country"] } };
        wine.country_id = newCountryData[0].id;
      })()
    );
  }

  const newZone = formData.get("new-zone") as string;
  if (newZone) {
    tasks.push(
      (async () => {
        const newZoneData = await handleAddNewElement("zones", newZone);
        if (!newZoneData)
          return { errors: { general: ["Error creating new zone"] } };
        wine.zone_id = newZoneData[0].id;
      })()
    );
  }

  const newCellar = formData.get("new-cellar") as string;
  if (newCellar) {
    tasks.push(
      (async () => {
        const newCellarData = await handleAddNewElement("cellars", newCellar);
        if (!newCellarData)
          return { errors: { general: ["Error creating new cellar"] } };
        wine.cellar_id = newCellarData[0].id;
      })()
    );
  }

  const newType = formData.get("new-type") as string;
  if (newType) {
    tasks.push(
      (async () => {
        const newTypeData = await handleAddNewElement("types", newType);
        if (!newTypeData)
          return { errors: { general: ["Error creating new type"] } };
        wine.type_id = newTypeData[0].id;
      })()
    );
  }

  return Promise.all(tasks);
};

const handlePhotoUpload = async (photo: File, wine: WineDB) => {
  const supabase = createClient();

  const extension = photo.name.split(".").pop();
  const md5Id = md5.create().update(`${wine.id}`).hex();

  const { data: photoData, error: photoError } = await supabase.storage
    .from("wines")
    .upload(`${md5Id}.${extension}`, photo, { upsert: true });
  if (!photoData) return "Error uploading photo";

  const buffer = await photo.arrayBuffer();
  const metadata = await sharp(Buffer.from(buffer)).metadata();

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
};

const zodSchema = z
  .object({
    name: z
      .string({
        required_error: "Campo requerido",
      })
      .min(3, { message: "Mínimo 3 caracteres" })
      .max(50, {
        message: "Máximo 50 caracteres",
      }),
    description: z
      .string({
        required_error: "Campo requerido",
      })
      .min(3, { message: "Mínimo 3 caracteres" })
      .max(1000, {
        message: "Máximo 1000 caracteres",
      }),
    price: z
      .number({
        required_error: "Campo requerido",
      })
      .min(0.01, { message: "Mínimo 0.01" }),
    year: z
      .number({
        required_error: "Campo requerido",
      })
      .min(1700, { message: "Mínimo 1700" })
      .max(new Date().getFullYear(), {
        message: "Año no válido",
      }),
    grapes: z.array(z.number()),

    active: z.boolean(),
    tags: z.array(
      z.number({
        required_error: "Campo requerido",
      })
    ),
    photo: z.any(),
  })
  .required()
  .merge(
    z
      .object({
        id: z.number(),
        country_id: z.number(),
        zone_id: z.number(),
        cellar_id: z.number(),
      })
      .partial()
  );

const validateObject = (
  obj: Partial<
    Wine & {
      photo: File;
    }
  >
) => {
  const validatedSchema = zodSchema.safeParse(obj);
  if (!validatedSchema.success) {
    console.error("Validation error", validatedSchema.error.flatten());
    return {
      errors: validatedSchema.error.flatten().fieldErrors,
    };
  }
};

export const createWine = async (_: any, formData: FormData) => {
  const supabase = createClient();

  const wine = getWineObject(formData);
  const validatedSchema = validateObject(wine);

  if (validatedSchema?.errors) return validatedSchema;
  await handleNewObjects(wine, formData);

  const { data, error } = await supabase
    .from("wines")
    .insert(wine as WineDB)
    .select();

  if (error) {
    console.error("Error inserting wine", error);
    if (error.code === "23505")
      return { errors: { name: ["Ya existe un vino con este nombre."] } };

    return {
      errors: { general: [`Error creando vino => ${error.message}`] },
    };
  }

  const insertedWine = data?.[0];
  if (!insertedWine) return { errors: { general: ["Error inserting wine"] } };

  const photo = formData.get("photo") as File;
  if (photo.size > 0) {
    await handlePhotoUpload(photo, insertedWine);
  }

  redirect(`/admin/wines`);
};

export const updateWine = async (_: any, formData: FormData) => {
  const supabase = createClient();
  const wine = getWineObject(formData);

  await handleNewObjects(wine, formData);

  if (!wine.id) return { errors: { general: ["Wine id is required"] } };

  const { data, error, count, status, statusText } = await supabase
    .from("wines")
    .update(wine)
    .eq("id", wine.id)
    .select();

  const photo = formData.get("photo") as File;
  if (photo.size > 0) {
    await handlePhotoUpload(photo, data?.[0] as WineDB);
  }

  revalidatePath(`/wines/${wine.id}`);
  revalidatePath(`/admin/wines`);
  revalidatePath(`/wines`);
  redirect(`/admin/wines`);
};

export const deleteWine = async (wine: Wine) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("wines")
    .delete()
    .eq("id", wine.id);

  if (wine.photo_url) {
    const { data: photoData, error: photoError } = await supabase.storage
      .from("wines")
      .remove([wine.photo_url]);
  }

  revalidatePath(`/admin/wines`);
};

export const toggleActiveWine = async (id: number, value: boolean) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("wines")
    .update({ active: value })
    .eq("id", id)
    .select();
  revalidatePath(`/admin/wines`);
};
