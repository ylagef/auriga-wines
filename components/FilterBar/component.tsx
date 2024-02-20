"use client";

import "./styles.css";

import { MultiSelect } from "../MultiSelect";
import { Input } from "../ui/Input";

import Link from "next/link";
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
  searchParams: {
    countries?: string;
    grapes?: string;
    regions?: string;
    pairings?: string;
    cellars?: string;
    apellations?: string;
    sortBy?:
      | "price_asc"
      | "price_desc"
      | "year_asc"
      | "year_desc"
      | "created_at_asc"
      | "created_at_desc";
  };
}

function FilterBarComponent({
  countries,
  grapes,
  regions,
  pairings,
  cellars,
  apellations,
  searchParams,
}: FilterBarComponentProps) {
  return (
    <div className="flex flex-col w-full gap-2 px-2">
      <div className="flex flex-wrap justify-center w-full gap-2">
        <MultiSelect
          id="countries"
          placeholder="Países"
          options={countries?.map((country) => ({
            value: String(country.id),
            label: country.name,
          }))}
          searchParamValue={searchParams.countries}
        />
        <MultiSelect
          id="grapes"
          placeholder="Uvas"
          options={grapes?.map((grape) => ({
            value: String(grape.id),
            label: grape.name,
          }))}
          searchParamValue={searchParams.grapes}
        />
        <MultiSelect
          id="regions"
          placeholder="Regiones"
          options={regions?.map((country) => ({
            value: String(country.id),
            label: country.name,
          }))}
          searchParamValue={searchParams.regions}
        />
        <MultiSelect
          id="pairings"
          placeholder="Maridajes"
          options={pairings?.map((country) => ({
            value: String(country.id),
            label: country.name,
          }))}
          searchParamValue={searchParams.pairings}
        />
        <MultiSelect
          id="cellars"
          placeholder="Bodegas"
          options={cellars?.map((country) => ({
            value: String(country.id),
            label: country.name,
          }))}
          searchParamValue={searchParams.cellars}
        />
        <MultiSelect
          id="apellations"
          placeholder="D.O."
          options={apellations?.map((country) => ({
            value: String(country.id),
            label: country.name,
          }))}
          searchParamValue={searchParams.apellations}
        />
      </div>
      <div className="flex items-center justify-between gap-2">
        <Input placeholder="Nombre" className="shadow-sm" />
        <OrderBySelect />
      </div>
      <div className="flex justify-end">
        <Link href="/wines" className="text-sm">
          Limpiar filtros
        </Link>
      </div>
    </div>
  );
}

export default FilterBarComponent;
