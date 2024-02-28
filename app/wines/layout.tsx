import { IdleHandler } from "@/components/IdleHandler";
import Image from "next/image";
import { ReactNode } from "react";

function WinesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <IdleHandler />
      <header className="sticky top-0 z-50 flex items-center justify-center w-full px-2 py-3 bg-white/30 backdrop-blur">
        <Image
          src="/images/auriga-logo-wide.svg"
          alt="Auriga"
          width={17}
          height={17}
          className="w-auto h-4"
          priority
        />
      </header>

      <div className="w-full max-w-4xl px-4 py-2 grow">
        <main>{children}</main>
      </div>
      <footer className="flex items-center justify-center w-full p-4 mt-2">
        <p className="text-xs font-bold text-center">
          Todas nuestras botellas pueden ser compradas para consumir fuera del
          local con un 25% de descuento.
        </p>
      </footer>
    </>
  );
}

export default WinesLayout;
