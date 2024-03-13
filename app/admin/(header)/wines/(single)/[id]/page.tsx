import { updateWine } from "@/actions/wine";
import { WineForm } from "@/components/WineForm";
import { WineWithForeign } from "@/utils/supabase/parsedTypes";
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
    .select(
      "*, grapes:wines_grapes(wine_id, grape_id, grape:grape_id(id, name)), tags:wines_tags(wine_id, tag_id, tag:tag_id(id, name, style)),cellar:cellar_id(id, name),type:type_id(id, name),country:country_id(id, name),appellation:appellation_id(id, name)"
    )
    .eq("id", params.id)
    .returns<WineWithForeign[]>()
    .single();

  if (!wine) return <div>Wine not found</div>;

  return <WineForm wine={wine} action={updateWine} />;
}

export default EditPage;
