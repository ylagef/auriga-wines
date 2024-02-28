import Image from "next/image";
import Link from "next/link";
import React from "react";

function IdlePage() {
  return (
    <Link
      href="/wines"
      className="flex flex-col items-center justify-center w-full gap-10 p-10 grow focus-visible:outline-none"
      replace
    >
      <Image
        src="/images/auriga-logo-small.svg"
        alt="Auriga"
        width={60}
        height={60}
        className="w-auto h-12"
        priority
      />

      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold">Bienvenidx a nuestra Cava</h1>
        <h2 className="text-center">
          Descubre nuestra selección de vinos y disfruta de una experiencia
          inolvidable.
        </h2>
      </div>

      <span className="animate-pulse">Toca para empezar</span>
    </Link>
  );
}

export default IdlePage;
