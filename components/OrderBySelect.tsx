"use client";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/Select";
import { useState } from "react";

export const OrderBySelect = () => {
  const { updateSearchParams } = useUpdateSearchParams();
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <div className="fixed top-0 left-0 z-10 w-screen h-screen pointer-events-none bg-white/50" />
      )}

      <Select
        onOpenChange={(o) => setOpen(o)}
        onValueChange={(v) => {
          updateSearchParams("sortBy", v);
        }}
      >
        <SelectTrigger className="w-full text-left text-gray-600 shadow-sm sm:w-48 animate-fade-in">
          <SelectValue placeholder="Ordenar por..." />
        </SelectTrigger>
        <SelectContent className="bg-white shadow-sm">
          <SelectItem value="price_asc">Precio ascendente</SelectItem>
          <SelectItem value="price_desc">Precio descendente</SelectItem>
          <SelectItem value="year_asc">Añada ascendente</SelectItem>
          <SelectItem value="year_desc">Añada descendente</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
};
