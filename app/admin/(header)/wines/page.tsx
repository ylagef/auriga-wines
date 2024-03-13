import { WinesTable } from "@/components/WinesTable";
import { Button } from "@/components/ui/Button";
import { Wine, WineWithForeign } from "@/utils/supabase/parsedTypes";

import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function AdminPage() {
  const supabase = createClient();

  const { data: wines } = await supabase
    .from("wines")
    .select(
      "id, name, description, price, year, photo_url, photo_size, country:country_id(name), appellation:appellation_id(name), active, tags:wines_tags(wine_id, tag_id, tag:tag_id(id, name, style))"
    )
    .returns<WineWithForeign[]>();

  if (!wines) return <div>Vinos no encontrados</div>;

  return (
    <div className="flex flex-col items-center flex-1 w-full h-full max-w-6xl gap-4 px-4">
      <div className="flex flex-wrap items-center justify-between w-full gap-2 mt-2">
        <Link
          href="/admin/wines/new"
          className="flex items-center w-full gap-2 sm:w-auto"
        >
          <Button className="w-full">Añadir nuevo</Button>
        </Link>

        <span className="inline-block whitespace-nowrap">
          <strong>Total:</strong> {wines.length} vinos
        </span>
      </div>

      <WinesTable data={wines} />
    </div>
  );
}
