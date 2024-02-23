import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

function SingleLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container px-4">
      <Link href="/admin/wines" className="flex items-center gap-2">
        <ArrowLeft className="w-6 h-6" />
        Volver a la lista
      </Link>

      {children}
    </div>
  );
}

export default SingleLayout;
