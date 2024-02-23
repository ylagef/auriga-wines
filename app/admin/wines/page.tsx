import { SignOutButton } from "@/components/SignOutButton";
import { WinesTable } from "@/components/WinesTable";
import { Button } from "@/components/ui/Button";
import { Wine, WineDB } from "@/utils/supabase/parsedTypes";

import { createClient } from "@/utils/supabase/server";
import { QueryData } from "@supabase/supabase-js";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data: wines } = await supabase
    .from("wines")
    .select(
      "id, name, description, price, year, photo_url, photo_size, grapes, new, apellation:apellation_id(name), country:country_id(name), region:region_id(name), created_at, active"
    );

  if (!wines) return <div>Wines not found</div>;

  type WinesWithForeign = QueryData<typeof wines>;

  return (
    <div className="flex flex-col items-center flex-1 w-full max-w-6xl gap-4 px-4">
      {/* <AuthButton /> */}

      <div className="flex justify-between w-full gap-2">
        <Link href="/admin/wines/new" className="flex items-center gap-2">
          <Button>Añadir nuevo</Button>
        </Link>
        <SignOutButton />
      </div>

      <WinesTable data={wines} />
    </div>
  );
}
