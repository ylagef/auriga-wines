import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

async function WinesLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return redirect("/admin/login");
  return <>{children}</>;
}

export default WinesLayout;
