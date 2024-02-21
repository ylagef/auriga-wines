"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export const BackButton = () => {
  const searchParams = useSearchParams();

  return (
    <Link
      href={`/wines${searchParams ? `?${searchParams.toString()}` : ""}`}
      className="flex items-center gap-2"
    >
      <ArrowLeft className="w-6 h-6" />
      Volver a la lista
    </Link>
  );
};
