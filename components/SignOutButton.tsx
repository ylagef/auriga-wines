"use client";
import React from "react";
import { Button } from "./ui/Button";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export const SignOutButton = () => {
  const supabase = createClient();
  const router = useRouter();
  return (
    <Button
      variant={"ghost"}
      onClick={async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
          console.error("Error signing out:", error);
        } else {
          router.push("/wines");
        }
      }}
    >
      Cerrar sesión
    </Button>
  );
};
