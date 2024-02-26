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
  const regionsQuery = supabase.from("regions").select("id, name");
  const cellarsQuery = supabase.from("cellars").select("id, name");
  const apellationsQuery = supabase.from("apellations").select("id, name");

  const [
    { data: countries },
    { data: grapes },
    { data: regions },
    { data: cellars },
    { data: apellations },
  ] = await Promise.all([
    countriesQuery,
    grapesQuery,
    regionsQuery,
    cellarsQuery,
    apellationsQuery,
  ]);

  return (
    <Form
      wine={wine}
      action={action}
      countries={countries}
      grapes={grapes}
      regions={regions}
      cellars={cellars}
      apellations={apellations}
    />
  );
};
