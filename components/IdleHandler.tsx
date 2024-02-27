"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MAX_IDLE_TIME = 60; // 1 minute

export const IdleHandler = () => {
  const [idleTime, setIdleTime] = useState(0);
  const router = useRouter();

  const restart = () => {
    setIdleTime(0);
  };

  useEffect(() => {
    // Increment idle time every second. Reset it when the user interacts with the page.
    const interval = setInterval(() => {
      setIdleTime((prev) => {
        console.log("idleTime", prev);
        if (prev >= MAX_IDLE_TIME) {
          router.push("/idle");
        }

        return prev + 1;
      });
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
