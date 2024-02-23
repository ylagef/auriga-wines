import { toggleActiveWine } from "@/actions/wine";
import { cn } from "@/utils";
import { Wine } from "@/utils/supabase/parsedTypes";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu";
import { Dispatch, SetStateAction } from "react";
import { Badge } from "../ui/Badge";

const sortableHeader: (label: string) => ColumnDef<Wine>["header"] =
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

export const columns: (
  setAlertOpen: Dispatch<SetStateAction<string | null>>
) => ColumnDef<Wine>[] = (setAlertOpen) => [
  {
    accessorKey: "new",
    header: sortableHeader("Tag"),
    cell: ({ row }) => (
      <div className="flex items-center justify-center w-full">
        {row.original.new && (
          <Badge variant="default" className="-rotate-90">
            Nuevo
          </Badge>
        )}
      </div>
    ),
  },
  {
    accessorKey: "photo_url",
    header: "Foto",
    cell: ({ row }) => {
      const size = row.original.photo_size as {
        width: number;
        height: number;
      };
      return (
        <div className="w-24 aspect-square">
          <Image
            src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/wines/${row.original.photo_url}`}
            alt={row.original.name}
            width={size?.width || 20}
            height={size?.height || 20}
            className="object-contain w-auto h-full"
          />
        </div>
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
    accessorFn: (row) =>
      Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "EUR",
      }).format(row.price),
  },

  {
    accessorKey: "created_at",
    header: sortableHeader("Añadido"),
    cell: ({ row }) => (
      <span className="text-center">
        {new Date(row.original.created_at).toLocaleDateString("es-ES", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "numeric",
          minute: "numeric",
        })}
      </span>
    ),
  },
  {
    header: "Acciones",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center justify-center w-full">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link
              href={`/admin/wines/${row.original.id}`}
              className="cursor-pointer"
            >
              Editar
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              toggleActiveWine(row.original.id, !row.original.active)
            }
            className="cursor-pointer"
          >
            {row.original.active ? "Desactivar" : "Activar"}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-red-700 cursor-pointer"
            onClick={() => setAlertOpen(String(row.original.id))}
          >
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];