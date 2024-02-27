import { Badge } from "@/components/ui/Badge";
import { createClient } from "@/utils/supabase/server";
import { Database, Json } from "@/utils/supabase/types";
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
    .select(
      "*, apellation:apellation_id(name), country:country_id(name), region:region_id(name),cellar:cellar_id(name)"
    )
    .eq("id", params.id)
    .returns<
      (Database["public"]["Tables"]["wines"]["Row"] & {
        apellation: { name: string };
        country: { name: string };
        region: { name: string };
        cellar: { name: string };
      })[]
    >()
    .single();

  if (!wine) return <div>Wine not found</div>;

  let tagsData:
    | [{ id: number; name: string; status: string; style: Json }]
    | null = null;
  if (wine.tags) {
    const tagsResponse = await supabase
      .from("tags")
      .select("id, name, style")
      .in("id", wine.tags);
    tagsData = tagsResponse.data as typeof tagsData;
    console.log(wine.tags, tagsData);
  }

  const size = wine.photo_size as { width: number; height: number };
  return (
    <div className="flex flex-col items-center w-full gap-4 animate-fade-in">
      <Image
        src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/wines/${wine.photo_url}`}
        alt={wine.name}
        width={size.width || 100}
        height={size.height || 100}
        className="object-contain w-2/3 mb-10 aspect-square"
      />

      <Badge variant="secondary">{wine.year}</Badge>

      <div className="flex flex-wrap items-center justify-center gap-1">
        {wine.tags
          ?.map((tag) => tagsData?.find((t) => t.id === tag))
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

      <h2 className="text-2xl font-bold text-center">{wine.name}</h2>
      <p className="text-center text-gray-600 whitespace-break-spaces">
        {wine.description}
      </p>

      <div className="flex flex-col items-center justify-center">
        <div className="flex gap-2">
          <label className="font-semibold text-center">País:</label>
          <h3 className="text-center">{wine.country.name}</h3>
          <label className="font-semibold text-center">Región:</label>
          <h3 className="text-center">{wine.region.name}</h3>
        </div>

        <div className="flex gap-2">
          <label className="font-semibold text-center">
            Denominación de origen:
          </label>
          <h3 className="text-center">{wine.apellation.name}</h3>
        </div>
        <div className="flex gap-2">
          <label className="font-semibold text-center">Bodega:</label>
          <h3 className="text-center">{wine.cellar.name}</h3>
        </div>
      </div>

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
