"use server";

import { createClient } from "@/utils/supabase/server";
import { AuthError } from "@supabase/supabase-js";
import { headers } from "next/headers";
import { RedirectType, redirect } from "next/navigation";

export const signIn = async (formData: FormData) => {
  let signInError: AuthError | null = null;
  try {
    const supabase = createClient();

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    signInError = error;

    console.log({ data });
  } catch (e) {
    console.error("error signing in", e);
  }

  if (signInError) {
    return redirect("/admin/login?message=Could not authenticate user");
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
