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
  console.log(wine);

  if (!wine) return <div>Wine not found</div>;

  const size = wine.photo_size as { width: number; height: number };
  return (
    <div className="flex flex-col items-center w-full gap-8 animate-fade-in">
      <Image
        src={`https://jacopngdwpoypvunhunq.supabase.co/storage/v1/object/public/wines/w${wine.photo_url}`}
        alt={wine.name}
        width={size.width || 100}
        height={size.height || 100}
        className="object-contain w-3/4 aspect-square"
      />
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
