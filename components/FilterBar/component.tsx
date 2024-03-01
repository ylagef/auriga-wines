"use client";

import "./styles.css";

import { MultiSelect } from "../MultiSelect";

import Link from "next/link";
import { NameFilter } from "../NameFilter";
import { OrderBySelect } from "../OrderBySelect";
import { RangeSelect } from "../RangeSelect";

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
  zones:
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
  maxWinePrice:
    | {
        price: number;
      }[]
    | null;
  maxYears:
    | {
        year: number;
      }[]
    | null;
  tags:
    | {
        id: number;
        name: string;
      }[]
    | null;
  types:
    | {
        id: number;
        name: string;
      }[]
    | null;
}

function FilterBarComponent({
  countries,
  grapes,
  zones,
  cellars,
  maxWinePrice,
  maxYears,
  tags,
  types,
}: FilterBarComponentProps) {
  return (
    <div className="flex flex-col w-full gap-2">
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
          id="zones"
          placeholder="Zonas"
          options={zones?.map((country) => ({
            value: String(country.id),
            label: country.name,
          }))}
        />
        <MultiSelect
          id="cellars"
          placeholder="Bodegas"
          options={cellars?.map((country) => ({
            value: String(country.id),
            label: country.name,
          }))}
        />
        <MultiSelect
          id="grapes"
          placeholder="Uva predominante"
          options={grapes?.map((country) => ({
            value: String(country.id),
            label: country.name,
          }))}
        />
        <MultiSelect
          id="tags"
          placeholder="Tags"
          options={tags?.map((tag) => ({
            value: String(tag.id),
            label: tag.name,
          }))}
        />
        <MultiSelect
          id="types"
          placeholder="Tipos"
          options={types?.map((tag) => ({
            value: String(tag.id),
            label: tag.name,
          }))}
        />
        <NameFilter />
      </div>

      <div className="flex flex-wrap justify-between gap-6">
        <div className="flex items-center gap-6 grow min-w-80">
          <RangeSelect
            id="year"
            min={maxYears?.[0]?.year || 1800}
            max={new Date().getFullYear()}
            step={1}
            labelFormatter={(value) => String(value)}
          />
          <RangeSelect
            id="price"
            min={0}
            max={maxWinePrice?.[0]?.price || 100}
            step={5}
            labelFormatter={(value) =>
              Intl.NumberFormat("es-ES", {
                style: "currency",
                currency: "EUR",
                maximumFractionDigits: 0,
              }).format(Number(value))
            }
          />
        </div>
        <div className="flex items-center justify-between w-full gap-2 sm:w-auto">
          <OrderBySelect />
          <Link href="/wines" className="text-sm text-gray-600 sm:hidden">
            Limpiar filtros
          </Link>
        </div>
      </div>
      <div className="justify-end hidden sm:flex">
        <Link href="/wines" className="text-sm text-gray-600">
          Limpiar filtros
        </Link>
      </div>
    </div>
  );
}

export default FilterBarComponent;
