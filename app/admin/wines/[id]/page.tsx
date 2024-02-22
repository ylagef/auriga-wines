import { updateWine } from "@/actions/create-wine";
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

  if (!wine) return <div>Wine not found</div>;

  return (
    <div className="container">
      <Link href="/admin/wines" className="flex items-center gap-2">
        <ArrowLeft className="w-6 h-6" />
        Volver a la lista
      </Link>

      <WineForm wine={wine} action={updateWine} />
    </div>
  );
}

export default EditPage;
