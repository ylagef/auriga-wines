"use client";

import "./styles.css";

import { MultiSelect } from "../MultiSelect";
import { Input } from "../ui/Input";

import Link from "next/link";
import { OrderBySelect } from "../OrderBySelect";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";
import { use, useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { useSearchParams } from "next/navigation";
import { Range } from "react-range";
import { RangeSelect } from "../RangeSelect";
import { NameFilter } from "../NameFilter";

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
  maxWinePrice:
    | {
        price: number;
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
  maxWinePrice,
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
        />
        <MultiSelect
          id="regions"
          placeholder="Regiones"
          options={regions?.map((country) => ({
            value: String(country.id),
            label: country.name,
          }))}
        />
        {/* <MultiSelect
          id="pairings"
          placeholder="Maridajes"
          options={pairings?.map((country) => ({
            value: String(country.id),
            label: country.name,
          }))}
        /> */}
        <MultiSelect
          id="cellars"
          placeholder="Bodegas"
          options={cellars?.map((country) => ({
            value: String(country.id),
            label: country.name,
          }))}
        />
        <MultiSelect
          id="apellations"
          placeholder="D.O."
          options={apellations?.map((country) => ({
            value: String(country.id),
            label: country.name,
          }))}
        />

        <NameFilter />
      </div>
      <div className="flex justify-between gap-6">
        <RangeSelect max={maxWinePrice?.[0]?.price || 100} />
        <OrderBySelect />
      </div>
      <div className="flex justify-end">
        <Link href="/wines" className="text-sm text-gray-600">
          Limpiar filtros
        </Link>
      </div>
    </div>
  );
}

export default FilterBarComponent;
