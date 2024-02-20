import React, { useCallback, useEffect } from "react";

interface UseClickOutsideProps {
  containerRefs: Array<React.MutableRefObject<HTMLElement | null>>;
  callback: () => void;
}

export const useClickOutside = ({
  containerRefs: containerRef,
  callback,
}: UseClickOutsideProps) => {
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      // Check if the click was outside the container
      console.log("click?");
      if (
        containerRef.every(
          (ref) => ref.current && !ref.current.contains(event.target as Node)
        )
      ) {
        console.log("click outside");
        callback();
      }
      console.log("click inside");
    },
    [containerRef, callback]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);
};
