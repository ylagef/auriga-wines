import { updateWine } from "@/actions/wine";
import { WineForm } from "@/components/WineForm";
import { createClient } from "@/utils/supabase/server";

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

  return <WineForm wine={wine} action={updateWine} />;
}

export default EditPage;
