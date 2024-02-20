"use client";
import { useSearchParams } from "@/hooks/useSearchParams";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/Select";
import { useState } from "react";

export const OrderBySelect = () => {
  const { addSearchParams } = useSearchParams();
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <div className="fixed top-0 left-0 z-10 w-screen h-screen pointer-events-none bg-white/50" />
      )}

      <Select
        onOpenChange={(o) => setOpen(o)}
        onValueChange={(v) => {
          addSearchParams("sortBy", v);
        }}
      >
        <SelectTrigger className="shadow-sm">
          <SelectValue placeholder="Ordenar por" />
        </SelectTrigger>
        <SelectContent className="bg-white shadow-sm">
          <SelectItem value="price_asc">Precio ascendente</SelectItem>
          <SelectItem value="price_desc">Precio descendente</SelectItem>
          <SelectItem value="year_asc">Año ascendente</SelectItem>
          <SelectItem value="year_desc">Año descendente</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
};
