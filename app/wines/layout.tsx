import DiscountButton from "@/components/DiscountButton";
import { IdleHandler } from "@/components/IdleHandler";
import Image from "next/image";
import { ReactNode } from "react";

function WinesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <IdleHandler />
      <header className="sticky top-0 z-50 flex items-center justify-center w-full px-2 py-4 bg-white/30 backdrop-blur">
        <Image
          src="/images/auriga-logo-wide.svg"
          alt="Auriga"
          width={17}
          height={17}
          className="w-auto h-4"
          priority
        />
      </header>

      <main className="w-full max-w-4xl px-4 py-1 pb-20 overflow-y-auto grow">
        {children}
      </main>

      <footer className="fixed bottom-0 flex items-center justify-center w-full p-4">
        <DiscountButton />
      </footer>
    </>
  );
}

export default WinesLayout;
