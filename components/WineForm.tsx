import { GrapesInput } from "@/components/GrapesInput";
import { SelectOrInput } from "@/components/SelectOrInput";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { Wine } from "@/utils/supabase/parsedTypes";
import { createClient } from "@/utils/supabase/server";
import { Checkbox } from "./ui/Checkbox";
import Image from "next/image";
import { TrashIcon } from "lucide-react";
import { WinePhotoFormInput } from "./WinePhotoFormInput";

interface WineFormProps {
  wine?: Wine;
  action: (_: FormData) => Promise<void>;
}

export const WineForm = async ({ wine, action }: WineFormProps) => {
  const supabase = createClient();

  const countriesQuery = supabase.from("countries").select("id, name");
  const grapesQuery = supabase.from("grapes").select("id, name");
  const regionsQuery = supabase.from("regions").select("id, name");
  // const pairingsQuery = supabase.from("pairings").select("id, name");
  const cellarsQuery = supabase.from("cellars").select("id, name");
  const apellationsQuery = supabase.from("apellations").select("id, name");

  const [
    { data: countries },
    { data: grapes },
    { data: regions },
    // { data: pairings },
    { data: cellars },
    { data: apellations },
  ] = await Promise.all([
    countriesQuery,
    grapesQuery,
    regionsQuery,
    // pairingsQuery,
    cellarsQuery,
    apellationsQuery,
  ]);

  return (
    <form className="flex flex-col gap-6 p-8 animate-fade-in" action={action}>
      {wine?.id && <input type="hidden" name="id" value={wine.id} />}

      <div className="flex flex-col w-full gap-2">
        <Label htmlFor="photo">Foto</Label>
        <WinePhotoFormInput wine={wine} />
      </div>

      <div className="flex flex-col w-full gap-2">
        <Label htmlFor="name">Nombre</Label>
        <Input
          required
          id="name"
          name="name"
          placeholder="Viña Costeira"
          defaultValue={wine?.name}
        />
      </div>

      <div className="flex flex-col w-full gap-2">
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Descripción del vino"
          defaultValue={wine?.description || ""}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:gap-2 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="price">Precio (€)</Label>
          <Input
            required
            id="price"
            name="price"
            type="number"
            placeholder="10"
            min={0}
            step={0.01}
            defaultValue={wine?.price}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="year">Año</Label>
          <Input
            required
            id="year"
            name="year"
            type="number"
            placeholder="2020"
            min={1700}
            max={new Date().getFullYear()}
            defaultValue={wine?.year}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:gap-2 sm:grid-cols-2">
        <div className="flex flex-col w-full gap-2">
          <Label htmlFor="country">País</Label>
          <SelectOrInput
            id="country"
            options={countries}
            placeholder="Nombre del país"
            selected={wine?.country_id}
          />
        </div>

        <div className="flex flex-col w-full gap-2">
          <Label htmlFor="region">Región</Label>
          <SelectOrInput
            id="region"
            options={regions}
            placeholder="Nombre de la región"
            selected={wine?.region_id}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:gap-2 sm:grid-cols-2">
        <div className="flex flex-col w-full gap-2">
          <Label htmlFor="apellation">Denominación de origen</Label>
          <SelectOrInput
            id="apellation"
            options={apellations}
            placeholder="Nombre de la D.O."
            selected={wine?.apellation_id}
          />
        </div>

        <div className="flex flex-col w-full gap-2">
          <Label htmlFor="cellar">Bodega</Label>
          <SelectOrInput
            id="cellar"
            options={cellars}
            placeholder="Nombre de la bodega"
            selected={wine?.cellar_id}
          />
        </div>
      </div>

      <div className="flex flex-col w-full gap-2">
        <Label htmlFor="grape" className="self-start">
          Uvas
        </Label>
        <GrapesInput grapes={grapes} selected={wine?.grapes} />
      </div>

      <div className="flex flex-col w-full gap-2">
        <Label htmlFor="active" className="self-start">
          Visibilidad
        </Label>
        <label className="flex items-center gap-2">
          <Checkbox id="active" name="active" defaultChecked={wine?.active} />
          Activo
        </label>
      </div>

      <Button className="w-full mx-auto mt-8 font-bold max-w-72">
        {wine ? "Actualizar" : "Crear"}
      </Button>
    </form>
  );
};
