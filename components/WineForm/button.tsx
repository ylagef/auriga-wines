"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/Button";

export const SubmitButton = ({ children }: { children: React.ReactNode }) => {
  const { pending } = useFormStatus();

  return (
    <Button
      className="w-full mx-auto mt-8 font-bold max-w-72"
      aria-disabled={pending}
      disabled={pending}
    >
      {pending ? "Enviando..." : children}
    </Button>
  );
};
