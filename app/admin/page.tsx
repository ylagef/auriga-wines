import { redirect } from "next/navigation";

function AdminPage() {
  return redirect("/admin/wines");
}

export default AdminPage;
