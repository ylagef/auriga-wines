import { SignOutButton } from "@/components/SignOutButton";
import { WinesTable } from "@/components/WinesTable";
import { Button } from "@/components/ui/Button";
import { Wine } from "@/utils/supabase/parsedTypes";

import { createClient } from "@/utils/supabase/server";
import { Database } from "@/utils/supabase/types";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/admin/login");
  }

  const query = supabase
    .from("wines")
    .select(
      "id, name, description, price, year, photo_url, photo_size, grapes, tags, country:country_id(name), zone:zone_id(name), active"
    );

  const tagsQuery = supabase.from("tags").select("id, name, style");

  const [{ data: wines }, { data: tagsData }] = await Promise.all([
    query.returns<Wine[]>(),
    tagsQuery,
  ]);

  if (!wines) return <div>Wines not found</div>;

  return (
    <div className="flex flex-col items-center flex-1 w-full max-w-6xl gap-4 px-4">
      <div className="flex w-full gap-2 mt-2">
        <Link
          href="/admin/wines/new"
          className="flex items-center w-full gap-2 sm:w-auto"
        >
          <Button className="w-full">Añadir nuevo</Button>
        </Link>
      </div>

      <WinesTable data={wines} tags={tagsData} />
    </div>
  );
}
