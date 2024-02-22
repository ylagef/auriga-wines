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
import { Wine } from "@/utils/supabase/parsedTypes";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/AlertDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu";
import Image from "next/image";

interface DataTableProps {
  data: Wine[];
}

const sortableHeader =
  (label: string) =>
  ({ column }) =>
    (
      <button
        className="flex items-center gap-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <ArrowDown
          className={cn(
            "w-4 h-4 ml-2 transition-transform",
            column.getIsSorted() === "asc" && "rotate-180"
          )}
        />
        {label}
      </button>
    );

export const WinesTable = ({ data }: DataTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [alertOpen, setAlertOpen] = useState<string | null>(null);
  const columns: ColumnDef<Wine>[] = [
    {
      accessorKey: "photo_url",
      header: "Foto",
      cell: ({ row }) => {
        const size = row.original.photo_size as {
          width: number;
          height: number;
        };
        return (
          <Image
            src={`https://jacopngdwpoypvunhunq.supabase.co/storage/v1/object/public/wines/${row.original.photo_url}`}
            alt={row.original.name}
            width={size?.width || 20}
            height={size?.height || 20}
            className="object-contain h-20"
          />
        );
      },
    },
    {
      accessorKey: "name",
      header: sortableHeader("Nombre"),
    },
    {
      accessorKey: "year",
      header: sortableHeader("Año"),
    },
    {
      accessorKey: "apellation.name",
      header: sortableHeader("D.O."),
    },
    {
      accessorKey: "price",
      header: sortableHeader("Precio"),
      accessorFn: (row: any) =>
        Intl.NumberFormat("es-ES", {
          style: "currency",
          currency: "EUR",
        }).format(row.price),
    },

    {
      accessorKey: "created_at",
      header: sortableHeader("Fecha creación"),
      accessorFn: (row: any) =>
        new Date(row.created_at).toLocaleDateString("es-ES"),
    },
    {
      header: "Acciones",
      cell: ({ row }) => {
        console.log(row);

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center justify-center w-full">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link href={`/admin/wines/${row.original.id}`}>Editar</Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-700"
                onClick={() => setAlertOpen(String(row.original.id))}
              >
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });
  return (
    <>
      <AlertDialog open={!!alertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              ¿Seguro que quieres eliminar "
              {data.find((wine) => String(wine.id) === alertOpen)?.name}"?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará el vino de la base
              de datos <b>permanentemente</b>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setAlertOpen(null)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction className="text-white bg-red-700">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};
