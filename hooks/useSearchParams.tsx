"use client";
import { useRouter } from "next/navigation";

export const useSearchParams = () => {
  const router = useRouter();

  const addSearchParams = (key: string, value: string | string[]) => {
    const url = new URL(window.location.href);
    if (Array.isArray(value)) {
      value.forEach((v) => url.searchParams.append(key, v));
    } else {
      url.searchParams.set(key, value);
    }
    router.push(`${url.pathname}?${url.searchParams.toString()}`);
  };

  return { addSearchParams };
};
