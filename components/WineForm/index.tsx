import { Wine, WineWithForeign } from "@/utils/supabase/parsedTypes";
import { createClient } from "@/utils/supabase/server";
import { Form } from "./form";

interface WineFormProps {
  wine?: WineWithForeign;
  action: (
    _: any,
    formData: FormData
  ) => Promise<{
    errors: any;
  }>;
}

export const WineForm = async ({ wine, action }: WineFormProps) => {
  const supabase = createClient();

  const countriesQuery = supabase.from("countries").select("*");
  const grapesQuery = supabase.from("grapes").select("*");
  const zonesQuery = supabase.from("zones").select("*");
  const cellarsQuery = supabase.from("cellars").select("*");
  const typesQuery = supabase.from("types").select("*");

  const [
    { data: countries },
    { data: grapes },
    { data: zones },
    { data: cellars },
    { data: types },
  ] = await Promise.all([
    countriesQuery,
    grapesQuery,
    zonesQuery,
    cellarsQuery,
    typesQuery,
  ]);

  return (
    <Form
      wine={wine}
      action={action}
      countries={countries}
      grapes={grapes}
      zones={zones}
      cellars={cellars}
      types={types}
    />
  );
};
