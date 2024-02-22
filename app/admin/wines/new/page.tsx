import { WineForm } from "@/components/WineForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

async function NewPage() {
  return (
    <div className="container">
      <Link href="/admin/wines" className="flex items-center gap-2">
        <ArrowLeft className="w-6 h-6" />
        Volver a la lista
      </Link>

      <WineForm />
    </div>
  );
}

export default NewPage;
