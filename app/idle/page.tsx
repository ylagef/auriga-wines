import Image from "next/image";
import Link from "next/link";
import React from "react";

function IdlePage() {
  return (
    <Link
      href="/wines"
      className="flex flex-col items-center justify-center w-full gap-10 grow focus-visible:outline-none"
    >
      <Image
        src="/images/auriga-logo.svg"
        alt="Auriga"
        width={200}
        height={37.5}
        className="w-auto h-6"
        priority
      />

      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold">Bienvenidx a nuestra Cava</h1>
        <h2>
          Descubre nuestra selección de vinos y disfruta de una experiencia
          inolvidable.
        </h2>
      </div>

      <span className="animate-pulse">Toca para empezar</span>
    </Link>
  );
}

export default IdlePage;
