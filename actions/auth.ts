"use server";

import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { RedirectType, redirect } from "next/navigation";

export const signIn = async (formData: FormData) => {
  try {
    const supabase = createClient();

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log({ data });
    if (error) {
      redirect(
        "/admin/login?message=Could not authenticate user",
        RedirectType.replace
      );
    }

    redirect("/admin", RedirectType.replace);
  } catch (e) {
    console.error("error signing in", e);
  }
};

const signUp = async (formData: FormData) => {
  const origin = headers().get("origin");
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return redirect("/admin/login?message=Could not authenticate user");
  }

  return redirect(
    "/admin/login?message=Check email to continue sign in process"
  );
};
