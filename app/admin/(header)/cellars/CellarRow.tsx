"use client";

import React, { useEffect, useState } from "react";
import { SubmitButton } from "../../login/submit-button";
import { useFormState } from "react-dom";
import { updateCellar } from "@/actions/cellar";
import { Check } from "lucide-react";
import { cn } from "@/utils";

function CellarRow({
  cellar,
}: {
  cellar: {
    id: number;
    name: string;
  };
}) {
  const [state, formAction] = useFormState(updateCellar, {
    success: false,
  });
  const [errors, setErrors] = useState<Record<string, any> | undefined>(
    state.errors
  );

  useEffect(() => {
    setErrors(state.errors);
  }, [state.errors]);

  return (
    <div className="flex flex-col items-center w-full gap-1">
      <form
        id={`cellar-form-${cellar.id}`}
        className="flex items-center justify-between w-full"
        action={formAction}
        onFocus={() => setErrors({})}
      >
        <input type="hidden" name="id" value={cellar.id} />
        <input
          className="px-4 py-2 border-t border-b border-l border-black grow rounded-l-md"
          type="text"
          name="name"
          defaultValue={cellar.name}
        />

        <SubmitButton
          pendingText="Actualizando..."
          className={cn(
            "h-full px-4 py-2 text-white rounded-r-md transition-all w-auto border",
            state.success
              ? "bg-green-500 border-green-700"
              : "bg-black border-black"
          )}
          disabled={state.success}
          formAction={formAction}
        >
          {state.success ? (
            <Check className="w-6 h-6 text-white" />
          ) : (
            <span>Actualizar</span>
          )}
        </SubmitButton>
      </form>
      {errors?.name && (
        <span className="text-red-500 tex-xs">{errors?.name}</span>
      )}
      {errors?.general && (
        <span className="text-red-500 tex-xs">{errors?.general}</span>
      )}
    </div>
  );
}

export default CellarRow;
