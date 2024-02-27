"use client";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";
import { cn } from "@/utils";

import { useEffect, useRef, useState } from "react";
import Select from "react-select";

export const OrderBySelect = () => {
  const { updateSearchParams } = useUpdateSearchParams();
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <div className="fixed top-0 left-0 z-10 w-screen h-screen pointer-events-none bg-white/50" />
      )}

      <Select
        className={cn(open && "z-10")}
        classNames={{
          container: () => "w-56",
        }}
        placeholder="Ordenar por..."
        onChange={(option) => {
          updateSearchParams("sortBy", option!.value);
        }}
        onMenuOpen={() => {
          console.log("onMenuOpen");
          setOpen(true);
        }}
        onMenuClose={() => {
          console.log("onMenuClose");
          setOpen(false);
        }}
        options={[
          { value: "price_asc", label: "Precio ascendente" },
          { value: "price_desc", label: "Precio descendente" },
          { value: "year_asc", label: "Añada ascendente" },
          { value: "year_desc", label: "Añada descendente" },
        ]}
      />
    </>
  );
};
