import Link from "next/link";
import React from "react";

function IdlePage() {
  return (
    <Link
      href="/wines"
      className="flex flex-col items-center justify-center w-full grow"
    >
      <span className="animate-pulse">Toca para empezar</span>
    </Link>
  );
}

export default IdlePage;
