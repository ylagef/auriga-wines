import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/Badge";
import { TagDB, Wine } from "@/utils/supabase/parsedTypes";
import { cn } from "@/utils";
import { Json } from "@/utils/supabase/types";

export const WineElement = ({
  wine,
  parsedSearchParams,
  priority,
  tags,
}: {
  wine: Wine;
  parsedSearchParams: string;
  priority: boolean;
  tags:
    | {
        id: number;
        name: string;
        style: Json;
      }[]
    | null;
}) => {
  const size = wine.photo_size as { width: number; height: number };
  return (
    <Link
      href={{
        pathname: `/wines/${wine.id}`,
        query: parsedSearchParams,
      }}
      className="relative flex flex-col items-center gap-2 animate-fade-in"
    >
      <div className="absolute top-0 left-0 flex flex-col gap-2">
        {wine.tags
          ?.map((tag) => tags?.find((t) => t.id === tag))
          .sort((a, z) => (z?.name.length || 0) - (a?.name.length || 0))
          .map((tag) => (
            <Badge
              variant="default"
              className="w-fit"
              style={{
                ...((tag?.style as Record<string, string>) || {}),
              }}
              key={tag?.id}
            >
              {tag?.name}
            </Badge>
          ))}
      </div>

      <Badge variant="secondary" className="absolute top-0 right-0">
        {wine.year}
      </Badge>

      <Image
        src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/wines/${wine.photo_url}`}
        alt={wine.name}
        width={size.width || 100}
        height={size.height || 100}
        className="object-contain h-56"
        priority={priority}
      />

      <div className="flex flex-wrap items-center justify-center gap-1 mt-2">
        {wine.country && <Badge variant="outline">{wine.country.name}</Badge>}

        {wine.zone && <Badge variant="outline">{wine.zone.name}</Badge>}
      </div>

      <h3 className="font-bold text-center">{wine.name}</h3>

      <span className="text-sm">
        {Intl.NumberFormat("es-ES", {
          style: "currency",
          currency: "EUR",
        }).format(wine.price)}
      </span>
    </Link>
  );
};
