"use client";

import { useState } from "react";
import { Checkbox } from "./ui/Checkbox";
import { Input } from "./ui/Input";
import Select, { GroupBase, OptionsOrGroups } from "react-select";
import { Switch } from "./ui/Switch";
import { cn } from "@/utils";

interface SelectOrInputProps {
  id: string;
  placeholder: string;
  options:
    | {
        id: number;
        name: string;
        created_at: string;
        updated_at?: string;
      }[]
    | null;
  selected?: number | null;
  className?: string;
  text: string;
}

export const SelectOrInput = ({
  id,
  options = [],
  placeholder,
  selected,
  className,
  text,
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
          className={cn("animate-fade-in shadow-sm", className)}
          required
        />
      ) : (
        <Select
          name={id}
          required
          defaultValue={
            selected
              ? {
                  label: options?.find((option) => option.id === selected)
                    ?.name,
                  value: String(selected),
                }
              : undefined
          }
          classNames={{
            container: () => "w-full h-10 animate-fade-in z-10",
            control: () => "shadow-sm h-10",
          }}
          styles={{
            control: (base) => ({
              ...base,
              borderColor: "#e2e9f0!important",
              borderRadius: "0.375rem",
              fontSize: "0.875rem",
            }),
          }}
          placeholder={placeholder}
          options={options
            ?.sort((a, z) => a.name.localeCompare(z.name))
            .map((option) => ({
              value: String(option.id),
              label: option.name,
            }))}
        />
      )}

      <label className="flex items-center gap-2">
        <Switch
          checked={showNew}
          onCheckedChange={() => setShowNew((prev) => !prev)}
        />
        {text}
      </label>
    </>
  );
};
