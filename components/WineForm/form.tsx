"use client";

import { GrapesInput } from "@/components/GrapesInput";
import { SelectOrInput } from "@/components/SelectOrInput";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { cn } from "@/utils";
import {
  CellarDB,
  CountryDB,
  GrapeDB,
  TAGS,
  TypeDB,
  WineWithForeign,
  AppellationDB,
} from "@/utils/supabase/parsedTypes";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { WinePhotoFormInput } from "../WinePhotoFormInput";
import { Switch } from "../ui/Switch";
import { SubmitButton } from "./button";

interface WineFormProps {
  wine?: WineWithForeign;
  action: (
    _: any,
    formData: FormData
  ) => Promise<{
    errors: any;
  }>;
  grapes: GrapeDB[] | null;
  countries: CountryDB[] | null;
  appellations: AppellationDB[] | null;
  cellars: CellarDB[] | null;
  types: TypeDB[] | null;
}

export const Form = ({
  wine,
  action,
  countries,
  grapes,
  appellations,
  cellars,
  types,
}: WineFormProps) => {
  const [state, formAction] = useFormState(action, { errors: {} });
  const [errors, setErrors] = useState(state.errors);

  useEffect(() => {
    setErrors(state.errors);
  }, [state.errors]);

  return (
    <form
      className="flex flex-col gap-6 px-4 py-8 animate-fade-in"
      action={formAction}
      onFocus={() => setErrors({})}
    >
      {wine?.id !== undefined ? (
        <input type="hidden" name="id" value={wine.id} />
      ) : null}

      <div className="flex flex-col w-full gap-2">
        <Label htmlFor="photo">Foto</Label>
        <WinePhotoFormInput wine={wine} />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:gap-2 sm:grid-cols-3">
        <div className="flex flex-col w-full gap-2 sm:col-span-2">
          <Label htmlFor="name">Nombre</Label>
          <Input
            required
            id="name"
            name="name"
            placeholder="Nombre del vino"
            defaultValue={wine?.name}
            className={cn(
              "transition-all shadow-sm",
              errors?.name && "border-red-500 border-2 bg-red-500/10"
            )}
          />
          {errors?.name && (
            <span className="text-xs text-red-500">{errors.name}</span>
          )}
        </div>
        <div className="flex flex-col w-full gap-2">
          <Label htmlFor="country">Tipo</Label>
          <SelectOrInput
            id="type"
            options={types}
            placeholder="Tipo de vino"
            selected={wine?.type_id}
            className={cn(
              "transition-all",
              errors?.type && "border-red-500 border-2 bg-red-500/10"
            )}
            text="Nuevo tipo"
          />
          {errors?.type && (
            <span className="text-xs text-red-500">{errors.type}</span>
          )}
        </div>
      </div>

      <div className="flex flex-col w-full gap-2">
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          required
          id="description"
          name="description"
          placeholder="Descripción del vino"
          defaultValue={wine?.description || ""}
          className={cn(
            "transition-all shadow-sm",
            errors?.description && "border-red-500 border-2 bg-red-500/10"
          )}
        />
        {errors?.description && (
          <span className="text-xs text-red-500">{errors.description}</span>
        )}
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
            className={cn(
              "transition-all shadow-sm",
              errors?.price && "border-red-500 border-2 bg-red-500/10"
            )}
          />
          {errors?.price && (
            <span className="text-xs text-red-500">{errors.price}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="year">Añada</Label>
          <Input
            required
            id="year"
            name="year"
            type="number"
            placeholder="2020"
            min={1700}
            max={new Date().getFullYear()}
            defaultValue={wine?.year}
            className={cn(
              "transition-all shadow-sm",
              errors?.year && "border-red-500 border-2 bg-red-500/10"
            )}
          />
          {errors?.year && (
            <span className="text-xs text-red-500">{errors.year}</span>
          )}
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
            className={cn(
              "transition-all",
              errors?.country && "border-red-500 border-2 bg-red-500/10"
            )}
            text="Nuevo país"
          />
          {errors?.country && (
            <span className="text-xs text-red-500">{errors.country}</span>
          )}
        </div>
        <div className="flex flex-col w-full gap-2">
          <Label htmlFor="cellar">Bodega</Label>
          <SelectOrInput
            id="cellar"
            options={cellars}
            placeholder="Nombre de la bodega"
            selected={wine?.cellar_id}
            className={cn(
              "transition-all",
              errors?.cellar && "border-red-500 border-2 bg-red-500/10"
            )}
            text="Nueva bodega"
          />
          {errors?.cellar && (
            <span className="text-xs text-red-500">{errors.cellar}</span>
          )}
        </div>
      </div>

      <div className="grid items-center grid-cols-1 gap-6 sm:gap-2 sm:grid-cols-2">
        <div className="flex flex-col w-full gap-2">
          <Label htmlFor="appellation">Zona</Label>
          <SelectOrInput
            id="appellation"
            options={appellations}
            placeholder="Nombre de la zona"
            selected={wine?.appellation_id}
            className={cn(
              "transition-all",
              errors?.appellation && "border-red-500 border-2 bg-red-500/10"
            )}
            text="Nueva zona"
          />
          {errors?.appellation && (
            <span className="text-xs text-red-500">{errors.appellation}</span>
          )}
        </div>

        <div className="flex flex-col w-full gap-2">
          <span className="text-xs opacity-60">
            Ej: D.O. Ribeira Sacra, Vinos de Madrid, D.O.Ca Rioja, V.T. de
            Mallorca, Alsace...
          </span>
          <span className="text-xs opacity-60">
            <b>IMPORTANTE:</b> Escribir todos con el mismo formato.
          </span>
        </div>
      </div>

      <div className="flex flex-col w-full gap-2">
        <Label htmlFor="grape" className="self-start">
          Uvas predominantes
        </Label>
        <GrapesInput grapes={grapes || []} selected={wine?.grapes} />
      </div>

      <div className="flex flex-col items-start w-full gap-2">
        <Label htmlFor="active" className="self-start">
          Otros
        </Label>
        <label className="flex items-center gap-2">
          <Switch id="active" name="active" defaultChecked={wine?.active} />
          Activo
        </label>
        <label className="flex items-center gap-2">
          <Switch
            id="new"
            value="1"
            name="tag"
            defaultChecked={!!wine?.tags?.find((t) => t.tag_id === TAGS.NEW)}
          />
          Nuevo
        </label>
        <label className="flex items-center gap-2">
          <Switch
            id="bestseller"
            value="2"
            name="tag"
            defaultChecked={
              !!wine?.tags?.find((t) => t.tag_id === TAGS.BEST_SELLER)
            }
          />
          Más vendido
        </label>
      </div>

      <SubmitButton>{wine ? "Actualizar" : "Crear"}</SubmitButton>
      {errors?.general && (
        <span className="w-full text-xs text-center text-red-500">
          {errors.general}
        </span>
      )}
    </form>
  );
};
