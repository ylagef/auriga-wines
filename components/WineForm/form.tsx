"use client";

import { GrapesInput } from "@/components/GrapesInput";
import { SelectOrInput } from "@/components/SelectOrInput";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { WineDB } from "@/utils/supabase/parsedTypes";
import { useFormState } from "react-dom";
import { WinePhotoFormInput } from "../WinePhotoFormInput";
import { Switch } from "../ui/Switch";
import { SubmitButton } from "./button";
import { cn } from "@/utils";
import { useEffect, useState } from "react";

interface WineFormProps {
  wine?: WineDB;
  action: (
    _: any,
    formData: FormData
  ) => Promise<{
    errors: any;
  }>;
  countries: { id: number; name: string }[] | null;
  grapes: { id: number; name: string }[] | null;
  regions: { id: number; name: string }[] | null;
  cellars: { id: number; name: string }[] | null;
  apellations: { id: number; name: string }[] | null;
}

export const Form = ({
  wine,
  action,
  countries,
  grapes,
  regions,
  cellars,
  apellations,
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

      <div className="flex flex-col w-full gap-2">
        <Label htmlFor="name">Nombre</Label>
        <Input
          required
          id="name"
          name="name"
          placeholder="Nombre del vino"
          defaultValue={wine?.name}
          className={cn(
            "transition-all",
            errors?.name && "border-red-500 border-2 bg-red-500/10"
          )}
        />
        {errors?.name && (
          <span className="text-xs text-red-500">{errors.name}</span>
        )}
      </div>

      <div className="flex flex-col w-full gap-2">
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Descripción del vino"
          defaultValue={wine?.description || ""}
          className={cn(
            "transition-all",
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
              "transition-all",
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
            // min={1700}
            max={new Date().getFullYear()}
            defaultValue={wine?.year}
            className={cn(
              "transition-all",
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
          />
          {errors?.country && (
            <span className="text-xs text-red-500">{errors.country}</span>
          )}
        </div>

        <div className="flex flex-col w-full gap-2">
          <Label htmlFor="region">Región</Label>
          <SelectOrInput
            id="region"
            options={regions}
            placeholder="Nombre de la región"
            selected={wine?.region_id}
            className={cn(
              "transition-all",
              errors?.region && "border-red-500 border-2 bg-red-500/10"
            )}
          />
          {errors?.region && (
            <span className="text-xs text-red-500">{errors.region}</span>
          )}
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
            className={cn(
              "transition-all",
              errors?.apellation && "border-red-500 border-2 bg-red-500/10"
            )}
          />
          {errors?.apellation && (
            <span className="text-xs text-red-500">{errors.apellation}</span>
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
          />
          {errors?.cellar && (
            <span className="text-xs text-red-500">{errors.cellar}</span>
          )}
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
            defaultChecked={wine?.tags?.includes(1)}
          />
          Nuevo
        </label>
        <label className="flex items-center gap-2">
          <Switch
            id="bestseller"
            value="2"
            name="tag"
            defaultChecked={wine?.tags?.includes(2)}
          />
          Más vendido
        </label>
      </div>

      <SubmitButton>{wine ? "Actualizar" : "Crear"}</SubmitButton>
    </form>
  );
};
