import { redirect } from "next/navigation";

export default async function Index() {
  // Redirect to /wines
  return redirect("/wines");
}
