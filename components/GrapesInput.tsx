"use client";

import React, { useState } from "react";
import { Label } from "./ui/Label";
import { Checkbox } from "./ui/Checkbox";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { PlusIcon } from "lucide-react";
import { MultiSelectComponent } from "./MultiSelect/component";

interface Option {
  value: string;
  label: string;
}

interface GrapesInputProps {
  grapes:
    | {
        id: number;
        name: string;
      }[]
    | null;
  selected?: number[] | null;
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
        .filter((grape) => grape.id && selected.includes(grape.id))
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
      {/* <div className="flex flex-wrap gap-4">
        {allGrapes
          ?.sort((a, z) => a.name.localeCompare(z.name))
          ?.map((grape) => (
            <label
              className="flex items-center gap-2"
              key={grape.id || grape.name}
            >
              {grape.id ? (
                <Checkbox
                  id={String(grape.id)}
                  name="grape"
                  value={grape.id}
                  defaultChecked={selected?.includes(grape.id)}
                />
              ) : (
                <Checkbox id={grape.name} name="new-grape" value={grape.name} />
              )}
              {grape.name}
            </label>
          ))}
      </div> */}
      <div className="hidden">
        {selectedGrapes?.map((grape) => {
          if (grape.value !== grape.label) {
            return (
              <input
                key={grape.value}
                type=""
                name="grape"
                value={grape.value}
              />
            );
          }
          return (
            <input
              key={grape.label}
              type=""
              name="new-grape"
              value={grape.label}
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
