"use client";

import React, { useState } from "react";

function DiscountButton() {
  const [expanded, setExpanded] = useState(false);

  return (
    <button
      className="flex flex-col items-center gap-1 px-4 py-2 text-center border rounded-full shadow bg-white/50 border-black/20 backdrop-blur"
      onClick={() => setExpanded((prev) => !prev)}
    >
      <span className="text-sm font-bold">
        ¡Llévate nuestros vinos a casa con un 25% de descuento!
      </span>

      {expanded && (
        <span className="text-xs animate-fade-in">
          Si deseas adquirir alguno de nuestros vinos para disfrutar en tu
          hogar, consulta a nuestro personal para obtener un 25% de descuento en
          tu compra.
        </span>
      )}
    </button>
  );
}

export default DiscountButton;
