import { WineForm } from "@/components/WineForm";
import { createClient } from "@/utils/supabase/server";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

async function EditPage({
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

  return (
    <div className="container">
      <Link href="/admin/wines" className="flex items-center gap-2">
        <ArrowLeft className="w-6 h-6" />
        Volver a la lista
      </Link>

      <WineForm wine={wine} />
    </div>
  );
}

export default EditPage;
