import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";

async function WinesPage() {
  const supabase = createClient();

  const { data: wines, error } = await supabase.from("wines").select();
  console.log(wines, error);
  return (
    <div className="container grid justify-center w-full grid-cols-3 gap-4 mx-auto">
      {wines?.map((wine) => {
        // Random number between 1 and 6
        const photoId = Math.floor(Math.random() * 6) + 1;
        return (
          <Link
            href={`/wines/${wine.id}`}
            key={wine.id}
            className="flex flex-col items-center justify-center gap-2 p-4"
          >
            <Image
              src={`https://jacopngdwpoypvunhunq.supabase.co/storage/v1/object/public/wines/w${photoId}.png`}
              alt={wine.name}
              width={150}
              height={150}
              className="object-contain w-60 aspect-square"
            />
            <h3 className="font-bold">{wine.name}</h3>
            <p className="text-sm text-center">{wine.description}</p>
            <span>
              {Intl.NumberFormat("es-ES", {
                style: "currency",
                currency: "EUR",
              }).format(wine.price)}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

export default WinesPage;
