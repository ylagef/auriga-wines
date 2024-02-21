import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";
import { cn } from "@/utils";
import { useDebounce } from "@uidotdev/usehooks";
import { useSearchParams } from "next/navigation";
import React, { CSSProperties, useEffect, useRef, useState } from "react";
import { Range, getTrackBackground, useThumbOverlap } from "react-range";

const ThumbLabel = ({
  rangeRef,
  values,
  index,
}: {
  rangeRef: Range | null;
  values: number[];
  index: number;
}) => {
  const [labelValue, style] = useThumbOverlap(rangeRef, values, index, 1);

  return (
    <div
      data-label={index}
      className={
        "absolute text-xs -bottom-5 text-gray-700 transition-all bg-white w-max"
      }
      style={style as CSSProperties}
    >
      {labelValue as string}
    </div>
  );
};

const STEP = 1;

export const YearRangeSelect = ({ min }: { min: number }) => {
  const rangeRef = useRef<Range>(null);

  const max = new Date().getFullYear();
  const searchParams = useSearchParams();
  const [values, setValues] = useState([
    Number(searchParams.get("from_year")) || min,
    Number(searchParams.get("to_year")) || max,
  ]);
  const debouncedSearchTermFrom = useDebounce(values[0], 500);
  const debouncedSearchTermTo = useDebounce(values[1], 500);
  const { updateSearchParams } = useUpdateSearchParams();

  useEffect(() => {
    if (debouncedSearchTermFrom === null) return;
    updateSearchParams(
      "from_year",
      debouncedSearchTermFrom === min ? "" : debouncedSearchTermFrom
    );
  }, [debouncedSearchTermFrom]);

  useEffect(() => {
    if (debouncedSearchTermTo === null) return;
    updateSearchParams(
      "to_year",
      debouncedSearchTermTo === max ? "" : debouncedSearchTermTo
    );
  }, [debouncedSearchTermTo]);

  useEffect(() => {
    setValues([
      Number(searchParams.get("from_year")) || min,
      Number(searchParams.get("to_year")) || max,
    ]);
  }, [searchParams]);

  return (
    <div className="flex flex-wrap items-center justify-center h-10 px-3 grow">
      <Range
        ref={rangeRef}
        values={values}
        step={STEP}
        min={min}
        max={max}
        onChange={(values) => {
          // if (values[1] - values[0] < 200) return;

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
                  min,
                  max,
                }),
                alignSelf: "center",
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ index, props, isDragged }) => {
          return (
            <div
              ref={props.ref}
              tabIndex={props.tabIndex}
              aria-valuenow={props["aria-valuenow"]}
              aria-valuemin={props["aria-valuemin"]}
              aria-valuemax={props["aria-valuemax"]}
              onKeyDown={props.onKeyDown}
              onKeyUp={props.onKeyUp}
              role={props.role}
              key={props.key}
              className="flex items-center justify-center transition-all focus-visible:outline-none animate-fade-in"
              style={{
                ...props.style,
                display: props.ref.current ? "flex" : "none",
              }}
            >
              <ThumbLabel
                rangeRef={rangeRef.current}
                values={values}
                index={index}
              />

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
