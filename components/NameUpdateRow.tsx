"use client";

import { cn } from "@/utils";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { SubmitButton } from "../app/admin/login/submit-button";

function NameUpdateRow({
  element,
  action,
}: {
  element: {
    id: number;
    name: string;
  };
  action: (
    _: any,
    formData: FormData
  ) => Promise<{
    success?: boolean;
    errors?: Record<string, any>;
  }>;
}) {
  const [formState, formAction] = useFormState(action, {});
  const [state, setState] = useState<Record<string, any> | undefined>(
    formState
  );

  useEffect(() => {
    setState(formState);
  }, [formState]);

  const { success, errors } = state || {};
  return (
    <div className="flex flex-col items-center w-full gap-1">
      <form
        className="flex items-center justify-between w-full"
        action={formAction}
        onFocus={() => setState({})}
      >
        <input type="hidden" name="id" value={element.id} />
        <input
          className="px-4 py-2 border-t border-b border-l border-black grow rounded-l-md"
          type="text"
          name="name"
          defaultValue={element.name}
        />

        <SubmitButton
          pendingText="Actualizando..."
          className={cn(
            "h-full px-4 py-2 text-white rounded-r-md transition-all w-auto border",
            success ? "bg-green-500 border-green-700" : "bg-black border-black"
          )}
          disabled={success}
          formAction={formAction}
        >
          {success ? <Check className="w-6 h-6 text-white" /> : "Actualizar"}
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

export default NameUpdateRow;
