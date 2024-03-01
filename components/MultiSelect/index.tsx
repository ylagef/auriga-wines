"use client";

import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MultiSelectComponent } from "./component";

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
  const searchParams = useSearchParams();
  const searchParamValue = searchParams.get(id);

  const [selected, setSelected] = useState<Option[]>(() => {
    const selectedValues = searchParamValue?.split(",");
    const selectedOptions = options.filter((option) =>
      selectedValues?.includes(option.value)
    );
    return selectedOptions || [];
  });
  const { updateSearchParams } = useUpdateSearchParams();

  useEffect(() => {
    const selectedValues = searchParamValue?.split(",");
    const selectedOptions = options.filter((option) =>
      selectedValues?.includes(option.value)
    );
    setSelected(selectedOptions);
  }, [searchParamValue]);

  useEffect(() => {
    updateSearchParams(
      id,
      selected.map((s) => s.value)
    );
  }, [selected]);

  return (
    <MultiSelectComponent
      options={options}
      placeholder={placeholder}
      selected={selected}
      setSelected={setSelected}
    />
  );
}
