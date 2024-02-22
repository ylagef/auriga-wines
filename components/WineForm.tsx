import { createWine } from "@/actions/create-wine";
import { GrapesInput } from "@/components/GrapesInput";
import { SelectOrInput } from "@/components/SelectOrInput";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { createClient } from "@/utils/supabase/server";

export const WineForm = async () => {
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
    <form className="flex flex-col gap-6 p-8" action={createWine}>
      <div className="flex flex-col w-full gap-2">
        <Label htmlFor="name">Nombre</Label>
        <Input required id="name" name="name" placeholder="Viña Costeira" />
      </div>

      <div className="flex flex-col w-full gap-2">
        <Label htmlFor="photo">Descripción</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Descripción del vino"
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
          />
        </div>
      </div>

      <div className="flex flex-col w-full gap-2">
        <Label htmlFor="photo">Foto</Label>
        <Input required id="photo" name="photo" type="file" />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:gap-2 sm:grid-cols-2">
        <div className="flex flex-col w-full gap-2">
          <Label htmlFor="country">País</Label>
          <SelectOrInput
            id="country"
            options={countries}
            placeholder="Nombre del país"
          />
        </div>

        <div className="flex flex-col w-full gap-2">
          <Label htmlFor="region">Región</Label>
          <SelectOrInput
            id="region"
            options={regions}
            placeholder="Nombre de la región"
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
          />
        </div>

        <div className="flex flex-col w-full gap-2">
          <Label htmlFor="cellar">Bodega</Label>
          <SelectOrInput
            id="cellar"
            options={cellars}
            placeholder="Nombre de la bodega"
          />
        </div>
      </div>

      <div className="flex flex-col items-center w-full gap-2">
        <Label htmlFor="grape" className="self-start">
          Uvas
        </Label>
        <GrapesInput grapes={grapes} />
      </div>

      <Button type="submit">Crear</Button>
    </form>
  );
};
