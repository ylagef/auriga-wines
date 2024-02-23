import { WinesTable } from "@/components/WinesTable";
import { Button } from "@/components/ui/Button";

import { createClient } from "@/utils/supabase/server";
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

  return (
    <div className="container flex flex-col items-center flex-1 w-full gap-4">
      {/* <AuthButton /> */}

      <div className="flex justify-end w-full">
        <Link href="/admin/wines/new" className="flex items-center gap-2">
          <Button>Añadir nuevo</Button>
        </Link>
      </div>

      <WinesTable data={wines} />
    </div>
  );
}
