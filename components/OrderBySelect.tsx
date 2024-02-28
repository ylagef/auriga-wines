"use client";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";
import { cn } from "@/utils";
import { useSearchParams } from "next/navigation";

import { useEffect, useRef, useState } from "react";
import Select from "react-select";

const OPTIONS: {
  value: string;
  label: string;
}[] = [
  { value: "price_asc", label: "Precio ascendente" },
  { value: "price_desc", label: "Precio descendente" },
  { value: "year_asc", label: "Añada ascendente" },
  { value: "year_desc", label: "Añada descendente" },
];

export const OrderBySelect = () => {
  const { updateSearchParams } = useUpdateSearchParams();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  const currentValue = searchParams.get("sortBy");
  return (
    <>
      {open && (
        <div className="fixed top-0 left-0 z-10 w-screen h-screen pointer-events-none bg-white/50" />
      )}

      <Select
        className={cn(open && "z-10")}
        classNames={{
          container: () => "w-2/3 sm:w-56",
          control: () => "shadow-sm",
        }}
        styles={{
          control: (base) => ({
            ...base,
            borderColor: "#e2e9f0",
            borderRadius: "0.375rem",
          }),
        }}
        placeholder="Ordenar por..."
        defaultValue={
          currentValue
            ? {
                value: currentValue,
                label: OPTIONS.find((option) => option.value === currentValue)!
                  .label,
              }
            : undefined
        }
        onChange={(option) => updateSearchParams("sortBy", option!.value)}
        onMenuOpen={() => setOpen(true)}
        onMenuClose={() => setOpen(false)}
        options={OPTIONS}
      />
    </>
  );
};
