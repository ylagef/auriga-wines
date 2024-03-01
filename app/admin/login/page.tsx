import { signIn } from "@/actions/auth";
import { SubmitButton } from "./submit-button";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) return redirect("/admin");

  return (
    <div className="flex flex-col justify-center flex-1 w-full gap-2 px-8 sm:max-w-md">
      <form className="flex flex-col justify-center flex-1 w-full gap-2 animate-in text-foreground">
        <Image
          src="/images/auriga-logo-small.svg"
          alt="Auriga"
          width={17}
          height={17}
          className="w-auto h-6 mb-10 sm:h-8"
          priority
        />
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="px-4 py-2 mb-6 border rounded-md bg-inherit"
          name="email"
          id="email"
          placeholder="a@b.com"
          autoComplete="email"
          required
        />
        <label className="text-md" htmlFor="password">
          Contraseña
        </label>
        <input
          className="px-4 py-2 mb-6 border rounded-md bg-inherit"
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          required
          autoComplete="current-password"
        />
        <SubmitButton
          formAction={signIn}
          className="px-4 py-2 mb-2 text-white bg-black rounded-md text-foreground"
          pendingText="Iniciando..."
        >
          Iniciar sesión
        </SubmitButton>
        {/* <SubmitButton
          formAction={signUp}
          className="px-4 py-2 mb-2 border rounded-md border-foreground/20 text-foreground"
          pendingText="Signing Up..."
        >
          Sign Up
        </SubmitButton> */}
        {searchParams?.message && (
          <p className="p-4 mt-4 text-center bg-foreground/10 text-foreground">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  );
}
