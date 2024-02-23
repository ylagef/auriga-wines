import { Badge } from "@/components/ui/Badge";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";

async function WineDetail({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const supabase = createClient();
  const { data: wine } = await supabase
    .from("wines")
    .select()
    .eq("id", params.id)
    .single();

  if (!wine) return <div>Wine not found</div>;

  const { data: grapesData, error: errorGrapes } = await supabase
    .from("grapes")
    .select("id, name")
    .in("id", wine.grapes);

  const size = wine.photo_size as { width: number; height: number };
  return (
    <div className="flex flex-col items-center w-full gap-4 animate-fade-in">
      <Image
        src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/wines/${wine.photo_url}`}
        alt={wine.name}
        width={size.width || 100}
        height={size.height || 100}
        className="object-contain w-3/4 aspect-square"
      />

      <div className="flex gap-2">
        {wine.new && <Badge variant="default">Nuevo</Badge>}
        <Badge variant="secondary">{wine.year}</Badge>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-1">
        {grapesData
          ?.filter((grape) => wine.grapes.includes(grape.id))
          .map((grape) => (
            <Badge key={grape.id} variant="outline">
              {grape.name}
            </Badge>
          ))}
      </div>

      <h3 className="font-bold text-center">{wine.name}</h3>

      <p className="text-sm text-center text-gray-600">{wine.description}</p>

      <span>
        {Intl.NumberFormat("es-ES", {
          style: "currency",
          currency: "EUR",
        }).format(wine.price)}
      </span>
    </div>
  );
}

export default WineDetail;
