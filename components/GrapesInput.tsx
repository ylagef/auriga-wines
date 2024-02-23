"use client";

import React, { useState } from "react";
import { Label } from "./ui/Label";
import { Checkbox } from "./ui/Checkbox";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { PlusIcon } from "lucide-react";

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

  const handleAddNewGrape = (name: string) => {
    if (newGrape?.length < 3) return;
    if (allGrapes?.some((grape) => grape.name === name)) return;

    setAllGrapes([...allGrapes, { name }]);
    setNewGrape("");
  };

  return (
    <>
      <div className="flex flex-wrap gap-4">
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
      </div>

      <span className="flex">
        <Input
          type="text"
          placeholder="Nueva uva"
          className="rounded-r-none w-52"
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
