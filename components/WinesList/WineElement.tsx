import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/Badge";
import { Wine } from "@/utils/supabase/parsedTypes";

export const WineElement = ({
  wine,
  parsedSearchParams,
  priority,
}: {
  wine: Wine;
  parsedSearchParams: string;
  priority: boolean;
}) => {
  const size = wine.photo_size as { width: number; height: number };
  return (
    <Link
      href={`/wines/${wine.id}${
        parsedSearchParams ? `?${parsedSearchParams}` : ""
      }`}
      key={wine.id}
      className="relative flex flex-col items-center gap-2 -z-10 animate-fade-in"
    >
      {wine.new && (
        <Badge variant="default" className="absolute top-0 left-0">
          Nuevo
        </Badge>
      )}

      <Badge variant="secondary" className="absolute top-0 right-0">
        {wine.year}
      </Badge>

      <Image
        src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/wines/${wine.photo_url}`}
        alt={wine.name}
        width={size.width || 100}
        height={size.height || 100}
        className="object-contain h-60"
        priority={priority}
      />

      <div className="flex flex-wrap items-center justify-center gap-1">
        {wine.country && <Badge variant="outline">{wine.country.name}</Badge>}

        {wine.apellation && (
          <Badge variant="outline">{wine.apellation.name}</Badge>
        )}
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
