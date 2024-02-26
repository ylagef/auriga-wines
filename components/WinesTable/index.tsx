"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { cn } from "@/utils";
import {
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { Dialog } from "./Dialog";
import { columns } from "./columns";
import { Json } from "@/utils/supabase/types";

interface DataTableProps {
  data: any[];
  tags: { id: number; name: string; style: Json | null }[] | null;
}

export const WinesTable = ({ data, tags }: DataTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "name",
      desc: true,
    },
  ]);
  const [alertOpen, setAlertOpen] = useState<string | null>(null);
  console.log(sorting);

  const table = useReactTable({
    data,
    columns: columns(setAlertOpen, tags),
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <>
      <Dialog data={data} alertOpen={alertOpen} setAlertOpen={setAlertOpen} />

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={cn(!row.original.active && "opacity-50")}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No hay resultados
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};
