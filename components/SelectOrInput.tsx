"use client";

import { useState } from "react";
import { Checkbox } from "./ui/Checkbox";
import { Input } from "./ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/Select";

interface SelectOrInputProps {
  id: string;
  placeholder: string;
  options:
    | {
        id: number;
        name: string;
      }[]
    | null;
  selected?: number | null;
}

export const SelectOrInput = ({
  id,
  options,
  placeholder,
  selected,
}: SelectOrInputProps) => {
  const [showNew, setShowNew] = useState(false);

  return (
    <>
      {showNew ? (
        <Input
          id={id}
          name={`new-${id}`}
          type="text"
          placeholder={placeholder}
          className="animate-fade-in"
          required
        />
      ) : (
        <Select
          name={id}
          required
          defaultValue={selected ? String(selected) : undefined}
        >
          <SelectTrigger className="w-full text-left shadow-sm animate-fade-in">
            <SelectValue placeholder="Seleccionar..." />
          </SelectTrigger>
          <SelectContent className="w-full bg-white shadow-sm">
            {options
              ?.sort((a, z) => a.name.localeCompare(z.name))
              ?.map((country) => (
                <SelectItem key={country.id} value={String(country.id)}>
                  {country.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      )}

      <label className="flex items-center gap-2 pl-4">
        <Checkbox
          checked={showNew}
          onCheckedChange={() => setShowNew((prev) => !prev)}
        />
        Otro/a
      </label>
    </>
  );
};
