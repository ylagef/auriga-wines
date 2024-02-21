import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";
import { cn } from "@/utils";
import { useDebounce } from "@uidotdev/usehooks";
import { XIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "./ui/Input";

export const NameFilter = () => {
  const searchParams = useSearchParams();
  const [name, setName] = useState<string | null>(searchParams.get("name"));
  const [focus, setFocus] = useState(false);
  const debouncedSearchTerm = useDebounce(name, 300);
  const { updateSearchParams } = useUpdateSearchParams();

  useEffect(() => {
    if (debouncedSearchTerm === null) return;
    updateSearchParams("name", debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    setName(searchParams.get("name"));
  }, [searchParams]);

  return (
    <>
      {focus && (
        <div className="fixed top-0 left-0 z-10 w-screen h-screen bg-white/50" />
      )}

      <div className="relative focus-within:z-20 animate-fade-in">
        <Input
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          placeholder="Nombre"
          className={cn(
            "text-center shadow-sm placeholder:text-gray-600 focus:w-72 transition-[width]",
            name?.length && "pr-8",
            name?.length ? `w-40` : "w-24"
          )}
          onChange={(e) => setName(e.target.value)}
          value={name || ""}
        />

        {name?.length && !focus ? (
          <button
            className="absolute text-gray-600 transform -translate-y-1/2 cursor-pointer right-1 top-1/2"
            onClick={() => setName("")}
          >
            <XIcon className="h-4 aspect-square" />
          </button>
        ) : null}
      </div>
    </>
  );
};
