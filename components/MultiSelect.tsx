"use client";

import { X } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/Command";
import { Command as CommandPrimitive } from "cmdk";
import {
  KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "@/utils";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useSearchParams as nextUseSearchParams } from "next/navigation";
import { useSearchParams } from "@/hooks/useSearchParams";

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options?: Option[];
  placeholder: string;
  id: string;
}

export function MultiSelect({
  options = [],
  placeholder,
  id,
}: MultiSelectProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const commandRef = useRef<HTMLDivElement>(null);
  const searchParams = nextUseSearchParams();

  const searchParamValue = searchParams.get(id);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Option[]>(() => {
    const selectedValues = searchParamValue?.split(",");
    const selectedOptions = options.filter((option) =>
      selectedValues?.includes(option.value)
    );
    return selectedOptions || [];
  });
  const [inputValue, setInputValue] = useState("");
  const { updateSearchParams } = useSearchParams();

  useEffect(() => {
    const selectedValues = searchParamValue?.split(",");
    const selectedOptions = options.filter((option) =>
      selectedValues?.includes(option.value)
    );
    setSelected(selectedOptions);
  }, [searchParamValue]);

  useClickOutside({
    containerRefs: [commandRef],
    callback: () => {
      setOpen(false);
    },
  });

  const handleUnselect = useCallback((option: Option) => {
    setSelected((prev) => prev.filter((s) => s.value !== option.value));
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current;
    if (input) {
      if (e.key === "Delete" || e.key === "Backspace") {
        if (input.value === "") {
          setSelected((prev) => {
            const newSelected = [...prev];
            newSelected.pop();
            return newSelected;
          });
        }
      }
      // This is not a default behaviour of the <input /> field
      if (e.key === "Escape") {
        input.blur();
      }
    }
  }, []);

  const inputWidth = useMemo(() => {
    if (selected.length > 0) return "auto";
    if (open) return `10rem`;

    return `calc(${placeholder.length + 2}ch + 1rem)`;
  }, [selected, placeholder, open]);

  const dropdownWidth = useMemo(() => {
    const maxLabelLength = Math.max(
      ...options.map((option) => option.label.length)
    );
    return `calc(${maxLabelLength + 1}ch + 0.75rem)`;
  }, [options]);

  useEffect(() => {
    if (!open) {
      setInputValue("");
    }
  }, [open]);

  useEffect(() => {
    updateSearchParams(
      id,
      selected.map((s) => s.value)
    );
  }, [selected]);

  const selectables = options.filter(
    (option) => !selected.find((s) => s.value === option.value)
  );

  return (
    <>
      {open && (
        <div className="fixed top-0 left-0 z-10 w-screen h-screen bg-white/50" />
      )}

      <Command
        ref={commandRef}
        onKeyDown={handleKeyDown}
        className={cn(
          "overflow-visible bg-transparent transition-[width] h-7",
          open && "z-10"
        )}
        style={{
          width: inputWidth,
        }}
      >
        <div className="flex items-center justify-center h-10 px-2 py-1 text-sm bg-white border rounded-md shadow-sm group border-input ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
          <div className="flex gap-1">
            {selected.map((option) => {
              return (
                <Badge key={option.value} variant="secondary">
                  {option.label}
                  <button
                    className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleUnselect(option);
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={() => handleUnselect(option)}
                  >
                    <X className="w-3 h-3 text-muted-foreground hover:text-foreground" />
                  </button>
                </Badge>
              );
            })}

            <CommandPrimitive.Input
              ref={inputRef}
              value={inputValue}
              onValueChange={setInputValue}
              onBlur={() => setOpen(false)}
              onFocus={() => setOpen(true)}
              placeholder={placeholder}
              className="flex-1 w-full text-center bg-transparent outline-none placeholder:text-muted-foreground"
              style={{
                width: `${placeholder.length + 1}ch`,
              }}
            />
          </div>
        </div>

        {open && selectables.length > 0 ? (
          <div className="relative mt-2">
            <div
              className="absolute top-0 z-30 w-full bg-white border rounded-md shadow-md outline-none bg-popover text-popover-foreground animate-in transition-[width]
              "
              style={{
                width: dropdownWidth,
                minWidth: "100%",
              }}
            >
              <CommandEmpty className="flex items-center justify-center h-10 p-2 text-sm">
                Sin resultados
              </CommandEmpty>

              <CommandGroup className="h-full overflow-auto">
                {selectables.map((option) => {
                  return (
                    <CommandItem
                      key={option.value}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={() => {
                        setInputValue("");
                        setSelected((prev) => [...prev, option]);
                      }}
                      className={"cursor-pointer"}
                    >
                      {option.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </div>
          </div>
        ) : null}
      </Command>
    </>
  );
}
