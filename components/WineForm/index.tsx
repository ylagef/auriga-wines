import { WineDB } from "@/utils/supabase/parsedTypes";
import { createClient } from "@/utils/supabase/server";
import { Form } from "./form";

interface WineFormProps {
  wine?: WineDB;
  action: (
    _: any,
    formData: FormData
  ) => Promise<{
    errors: any;
  }>;
}

export const WineForm = async ({ wine, action }: WineFormProps) => {
  const supabase = createClient();

  const countriesQuery = supabase.from("countries").select("id, name");
  const grapesQuery = supabase.from("grapes").select("id, name");
  const zonesQuery = supabase.from("zones").select("id, name");
  const cellarsQuery = supabase.from("cellars").select("id, name");
  const typesQuery = supabase.from("types").select("id, name");

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
