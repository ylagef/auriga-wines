import { BackButton } from "@/components/BackButton";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

function WineDetailLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-8 px-8">
      <header className="w-full">
        <BackButton />
      </header>

      {children}
    </div>
  );
}

export default WineDetailLayout;
