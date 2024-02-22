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
}

export const GrapesInput = ({ grapes }: GrapesInputProps) => {
  const [allGrapes, setAllGrapes] = useState<
    {
      id?: number;
      name: string;
    }[]
  >(grapes || []);
  const [newGrape, setNewGrape] = useState("");

  return (
    <>
      <div className="flex flex-wrap gap-4">
        {allGrapes?.map((grape) => (
          <label
            className="flex items-center gap-2"
            key={grape.id || grape.name}
          >
            {grape.id ? (
              <Checkbox id={String(grape.id)} name="grape" value={grape.id} />
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
        />
        <Button
          type="button"
          className="rounded-l-none"
          onClick={() => {
            setAllGrapes([...allGrapes, { name: newGrape }]);
            setNewGrape("");
          }}
        >
          <PlusIcon size={16} />
        </Button>
      </span>
    </>
  );
};
