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
      countries: searchParams.get("countries") || "",
      grapes: searchParams.get("grapes") || "",
      regions: searchParams.get("regions") || "",
      pairings: searchParams.get("pairings") || "",
      cellars: searchParams.get("cellars") || "",
      appellations: searchParams.get("apellations") || "",
    };
  }, []);

  return (
    <div className="flex flex-col w-full gap-2 px-2">
      <div className="flex flex-wrap justify-center w-full gap-2">
        <MultiSelect
          id="countries"
          placeholder="Países"
          options={
            countries?.map((country) => ({
              value: String(country.id),
              label: country.name,
            })) || []
          }
          initialSelected={initialValues?.countries?.split(",")}
        />
        <MultiSelect
          id="grapes"
          placeholder="Uvas"
          options={
            grapes?.map((grape) => ({
              value: String(grape.id),
              label: grape.name,
            })) || []
          }
          initialSelected={initialValues?.grapes?.split(",")}
        />
        <MultiSelect
          id="regions"
          placeholder="Regiones"
          options={
            regions?.map((country) => ({
              value: String(country.id),
              label: country.name,
            })) || []
          }
          initialSelected={initialValues?.regions?.split(",")}
        />
        <MultiSelect
          id="pairings"
          placeholder="Maridajes"
          options={
            pairings?.map((country) => ({
              value: String(country.id),
              label: country.name,
            })) || []
          }
          initialSelected={initialValues?.pairings?.split(",")}
        />
        <MultiSelect
          id="cellars"
          placeholder="Bodegas"
          options={
            cellars?.map((country) => ({
              value: String(country.id),
              label: country.name,
            })) || []
          }
          initialSelected={initialValues?.cellars?.split(",")}
        />
        <MultiSelect
          id="apellations"
          placeholder="D.O."
          options={
            apellations?.map((country) => ({
              value: String(country.id),
              label: country.name,
            })) || []
          }
          initialSelected={initialValues?.appellations?.split(",")}
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
