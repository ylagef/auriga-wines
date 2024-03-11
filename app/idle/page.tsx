import Image from "next/image";
import Link from "next/link";
import React from "react";

function IdlePage() {
  return (
    <Link
      href="/wines"
      className="relative w-full h-screen focus-visible:outline-none"
      replace
    >
      <Image
        src="/images/cover-content.svg"
        alt="Auriga"
        width={60}
        height={60}
        className="object-cover w-auto h-full mx-auto"
        priority
      />
      <span className="absolute w-full text-lg font-semibold text-center transform -translate-x-1/2 sm:text-xl bottom-10 left-1/2 animate-pulse">
        Toca para comenzar
      </span>
    </Link>
  );
}

export default IdlePage;
