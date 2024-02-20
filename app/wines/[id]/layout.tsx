import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

function WineDetailLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-8 px-8">
      <header className="w-full">
        <Link href="/wines" className="flex items-center gap-2">
          <ArrowLeft className="w-6 h-6" />
          Volver a la lista
        </Link>
      </header>

      {children}
    </div>
  );
}

export default WineDetailLayout;
