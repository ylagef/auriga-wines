import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";
import { cn } from "@/utils";
import { useDebounce } from "@uidotdev/usehooks";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Range, getTrackBackground } from "react-range";

const STEP = 5;
const MIN = 0;

export const RangeSelect = ({ max }: { max: number }) => {
  const maxRounded = Math.ceil(max / 100) * 100;
  const searchParams = useSearchParams();
  const [values, setValues] = useState([
    Number(searchParams.get("from_price")) || MIN,
    Number(searchParams.get("to_price")) || maxRounded,
  ]);
  const debouncedSearchTermFrom = useDebounce(values[0], 300);
  const debouncedSearchTermTo = useDebounce(values[1], 300);
  const { updateSearchParams } = useUpdateSearchParams();

  useEffect(() => {
    if (debouncedSearchTermFrom === null) return;
    updateSearchParams(
      "from_price",
      debouncedSearchTermFrom === MIN ? "" : debouncedSearchTermFrom
    );
  }, [debouncedSearchTermFrom]);

  useEffect(() => {
    if (debouncedSearchTermTo === null) return;
    updateSearchParams(
      "to_price",
      debouncedSearchTermTo === maxRounded ? "" : debouncedSearchTermTo
    );
  }, [debouncedSearchTermTo]);

  useEffect(() => {
    setValues([
      Number(searchParams.get("from_price")) || MIN,
      Number(searchParams.get("to_price")) || maxRounded,
    ]);
  }, [searchParams]);

  return (
    <div className="flex flex-wrap items-center justify-center h-10 px-3 grow">
      <Range
        values={values}
        step={STEP}
        min={MIN}
        max={maxRounded}
        onChange={(values) => {
          if (values[1] - values[0] < 200) return;
          setValues(values);
        }}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            className="flex w-full h-6 animate-fade-in"
            style={{
              ...props.style,
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: "5px",
                width: "100%",
                borderRadius: "4px",
                background: getTrackBackground({
                  values,
                  colors: ["#ccc", "#aaaaaa", "#ccc"],
                  min: MIN,
                  max: maxRounded,
                }),
                alignSelf: "center",
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ index, props, isDragged, value }) => {
          const getAbsolute = () => {
            if (index === 0) {
              if (values[0] < 100) return { left: 0 };
              return { left: -String(values[1]).length * 5 };
            } else {
              if (values[1] > maxRounded - 100) return { right: 0 };
              return { right: -String(values[1]).length * 5 };
            }
          };

          return (
            <div
              {...props}
              className="flex items-center justify-center transition-all focus-visible:outline-none animate-fade-in"
              style={{
                ...props.style,
                display: props.ref.current ? "flex" : "none",
              }}
            >
              <div
                className={cn(
                  "absolute text-xs -bottom-5 text-gray-700 transition-all"
                )}
                style={getAbsolute()}
              >
                {Intl.NumberFormat("es-ES", {
                  style: "currency",
                  currency: "EUR",
                  maximumFractionDigits: 0,
                }).format(values[index])}
              </div>

              <div
                className={cn(
                  "w-5 h-5 rounded-full outline-none",
                  isDragged ? "bg-gray-500" : "bg-gray-400"
                )}
              />
            </div>
          );
        }}
      />
    </div>
  );
};
