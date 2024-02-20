"use client";
import { useRouter } from "next/navigation";

export const useUpdateSearchParams = () => {
  const router = useRouter();

  const updateSearchParams = (key: string, value: string | string[]) => {
    const url = new URL(window.location.href);

    if (Array.isArray(value)) {
      if (value.length === 0) {
        url.searchParams.delete(key);
      } else {
        url.searchParams.set(key, value.join(","));
      }
    } else if (value === "") {
      url.searchParams.delete(key);
    } else {
      url.searchParams.set(key, value);
    }
    router.push(`${url.pathname}?${url.searchParams.toString()}`);
  };

  return { updateSearchParams };
};
