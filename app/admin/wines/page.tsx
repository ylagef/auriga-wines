import { SignOutButton } from "@/components/SignOutButton";
import { WinesTable } from "@/components/WinesTable";
import { Button } from "@/components/ui/Button";

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
    return redirect("/login");
  }

  const query = supabase
    .from("wines")
    .select(
      "id, name, description, price, year, photo_url, photo_size, grapes, tags, apellation:apellation_id(name), country:country_id(name), region:region_id(name), active"
    );

  const tagsQuery = supabase.from("tags").select("id, name, class_name");

  const [{ data: wines }, { data: tagsData }] = await Promise.all([
    query.returns<
      (Database["public"]["Tables"]["wines"]["Row"] & {
        apellation: { name: string };
        country: { name: string };
        region: { name: string };
      })[]
    >(),
    tagsQuery,
  ]);

  if (!wines) return <div>Wines not found</div>;

  return (
    <div className="flex flex-col items-center flex-1 w-full max-w-6xl gap-4 px-4">
      {/* <AuthButton /> */}

      <div className="flex justify-between w-full gap-2">
        <Link href="/admin/wines/new" className="flex items-center gap-2">
          <Button>Añadir nuevo</Button>
        </Link>
        <SignOutButton />
      </div>

      <WinesTable data={wines} tags={tagsData} />
    </div>
  );
}
