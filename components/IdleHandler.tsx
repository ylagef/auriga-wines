"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const MAX_IDLE_TIME = 10; // 1 minute

export const IdleHandler = () => {
  const idleTime = useRef(0);
  const router = useRouter();

  const restart = () => {
    idleTime.current = 0;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (idleTime.current >= MAX_IDLE_TIME) return router.push("/idle");
      idleTime.current += 1;
    }, 1000);

    window.addEventListener("mousemove", () => restart());
    window.addEventListener("keydown", () => restart());
    window.addEventListener("click", () => restart());
    window.addEventListener("scroll", () => restart());
    window.addEventListener("touchstart", () => restart());

    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", () => restart());
      window.removeEventListener("keydown", () => restart());
      window.removeEventListener("click", () => restart());
      window.removeEventListener("scroll", () => restart());
      window.removeEventListener("touchstart", () => restart());
    };
  }, []);

  return null;
};
