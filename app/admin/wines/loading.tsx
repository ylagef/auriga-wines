import Image from "next/image";
import React from "react";

function Loading() {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <Image
        src="/images/loading.svg"
        alt="Loading"
        width={38}
        height={38}
        className="object-contain w-20 opacity-50 aspect-square"
      />
      <p className="animate-pulse">Cargando...</p>
    </div>
  );
}

export default Loading;
