import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/wines");
  };

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}!
      <form action={signOut}>
        <button className="px-4 py-2 no-underline rounded-md">Logout</button>
      </form>
    </div>
  ) : (
    <Link
      href="/admin/login"
      className="flex px-3 py-2 no-underline rounded-md"
    >
      Login
    </Link>
  );
}
