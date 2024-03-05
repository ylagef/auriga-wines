"use client";

import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { MultiSelectComponent } from "./MultiSelect/component";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { GrapeDB, WineWithForeign } from "@/utils/supabase/parsedTypes";

interface Option {
  value: string;
  label: string;
}

interface GrapesInputProps {
  grapes: GrapeDB[];
  selected?: WineWithForeign["grapes"];
}

export const GrapesInput = ({ grapes, selected }: GrapesInputProps) => {
  const [allGrapes, setAllGrapes] = useState<
    {
      id?: number;
      name: string;
    }[]
  >(grapes || []);
  const [newGrape, setNewGrape] = useState("");
  const [selectedGrapes, setSelectedGrapes] = useState<Option[]>(() => {
    if (selected) {
      return allGrapes
        .filter(
          (grape) => grape.id && selected.find((g) => g.grape_id === grape.id)
        )
        .map((grape) => ({ value: String(grape.id), label: grape.name }));
    }
    return [];
  });

  const handleAddNewGrape = (name: string) => {
    if (newGrape?.length < 3) return;
    if (allGrapes?.some((grape) => grape.name === name)) return;

    setAllGrapes([...allGrapes, { name }]);
    setSelectedGrapes([...selectedGrapes, { value: name, label: name }]);
    setNewGrape("");
  };

  return (
    <>
      <div className="hidden">
        {selectedGrapes?.map((grape) => {
          if (grape.value !== grape.label) {
            return (
              <input
                key={grape.value}
                type=""
                name="grape"
                defaultValue={grape.value}
              />
            );
          }
          return (
            <input
              key={grape.label}
              type=""
              name="new-grape"
              defaultValue={grape.label}
            />
          );
        })}
      </div>

      <MultiSelectComponent
        options={grapes?.map((grape) => ({
          value: String(grape.id),
          label: grape.name,
        }))}
        placeholder={"Uvas "}
        selected={selectedGrapes}
        setSelected={setSelectedGrapes}
        wrapValues
      />

      <span className="flex shadow-sm">
        <Input
          type="text"
          placeholder="Nueva uva"
          className="w-full rounded-r-none"
          value={newGrape}
          onChange={(e) => setNewGrape(e.target.value)}
          onKeyDown={(e) => {
            if (e.key !== "Enter") {
              return;
            }
            e.preventDefault();
            handleAddNewGrape(newGrape);
          }}
        />
        <Button
          type="button"
          className="rounded-l-none"
          disabled={newGrape?.length < 3}
          onClick={() => handleAddNewGrape(newGrape)}
        >
          <PlusIcon size={16} />
        </Button>
      </span>
    </>
  );
};
