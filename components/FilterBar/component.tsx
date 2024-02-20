"use client";

import "./styles.css";

import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { MultiSelect } from "../MultiSelect";
import { Input } from "../ui/Input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import { OrderBySelect } from "../OrderBySelect";

interface FilterBarComponentProps {
  countries:
    | {
        id: number;
        name: string;
      }[]
    | null;
  grapes:
    | {
        id: number;
        name: string;
      }[]
    | null;
  regions:
    | {
        id: number;
        name: string;
      }[]
    | null;
  pairings:
    | {
        id: number;
        name: string;
      }[]
    | null;
  cellars:
    | {
        id: number;
        name: string;
      }[]
    | null;
  apellations:
    | {
        id: number;
        name: string;
      }[]
    | null;
}

function FilterBarComponent({
  countries,
  grapes,
  regions,
  pairings,
  cellars,
  apellations,
}: FilterBarComponentProps) {
  const router = useRouter();

  const initialValues = useMemo(() => {
    if (typeof window === "undefined") return null;

    const url = new URL(window.location.href);
    const searchParams = url.searchParams;

    return {
      country: searchParams.get("countries") || "",
      grape: searchParams.get("grapes") || "",
    };
  }, []);

  return (
    <div className="flex flex-col w-full gap-2 px-4">
      <div className="flex flex-wrap justify-center w-full gap-2">
        <MultiSelect
          placeholder="Países"
          options={
            countries?.map((country) => ({
              value: String(country.id),
              label: country.name,
            })) || []
          }
        />
        <MultiSelect
          placeholder="Uvas"
          options={
            grapes?.map((grape) => ({
              value: String(grape.id),
              label: grape.name,
            })) || []
          }
        />
        <MultiSelect
          placeholder="Regiones"
          options={
            regions?.map((country) => ({
              value: String(country.id),
              label: country.name,
            })) || []
          }
        />
        <MultiSelect
          placeholder="Maridajes"
          options={
            pairings?.map((country) => ({
              value: String(country.id),
              label: country.name,
            })) || []
          }
        />
        <MultiSelect
          placeholder="Bodegas"
          options={
            cellars?.map((country) => ({
              value: String(country.id),
              label: country.name,
            })) || []
          }
        />
        <MultiSelect
          placeholder="D.O."
          options={
            apellations?.map((country) => ({
              value: String(country.id),
              label: country.name,
            })) || []
          }
        />
      </div>
      <div className="flex items-center justify-between gap-2">
        <Input placeholder="Nombre" className="shadow-sm" />
        <OrderBySelect />
      </div>
    </div>
  );
}

export default FilterBarComponent;
