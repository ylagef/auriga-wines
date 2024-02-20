import { type ClassValue, clsx } from "clsx";
import { Router } from "next/router";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const addSearchParams = (
  router: Router,
  key: string,
  value: string | string[]
) => {
  const url = new URL(window.location.href);
  if (Array.isArray(value)) {
    value.forEach((v) => url.searchParams.append(key, v));
  } else {
    url.searchParams.set(key, value);
  }
  router.push(`${url.pathname}?${url.searchParams.toString()}`);
};
