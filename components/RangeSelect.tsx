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
  labelFormatter,
}: {
  rangeRef: Range | null;
  values: number[];
  index: number;
  labelFormatter?: (value: number | string) => string;
}) => {
  const [labelValue, style] = useThumbOverlap(
    rangeRef,
    values,
    index,
    1,
    undefined,
    labelFormatter
  );

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

const STEP = 5;

interface RangeSelectProps {
  id: string;
  min: number;
  max: number;
  step?: number;
  labelFormatter?: (value: number | string) => string;
}

export const RangeSelect = ({
  id,
  min,
  max,
  step,
  labelFormatter,
}: RangeSelectProps) => {
  const rangeRef = useRef<Range>(null);
  const searchParams = useSearchParams();
  const [values, setValues] = useState([
    Number(searchParams.get(`from_${id}`)) || min,
    Number(searchParams.get(`to_${id}`)) || max,
  ]);
  const debouncedSearchTermFrom = useDebounce(values[0], 500);
  const debouncedSearchTermTo = useDebounce(values[1], 500);
  const { updateSearchParams } = useUpdateSearchParams();

  useEffect(() => {
    if (debouncedSearchTermFrom === null) return;
    updateSearchParams(
      `from_${id}`,
      debouncedSearchTermFrom === min ? "" : debouncedSearchTermFrom
    );
  }, [debouncedSearchTermFrom]);

  useEffect(() => {
    if (debouncedSearchTermTo === null) return;
    updateSearchParams(
      `to_${id}`,
      debouncedSearchTermTo === max ? "" : debouncedSearchTermTo
    );
  }, [debouncedSearchTermTo]);

  useEffect(() => {
    setValues([
      Number(searchParams.get(`from_${id}`)) || min,
      Number(searchParams.get(`to_${id}`)) || max,
    ]);
  }, [searchParams]);

  return (
    <div className="flex flex-wrap items-center justify-center w-1/2 h-10 px-3 grow sm:w-auto">
      <Range
        ref={rangeRef}
        values={values}
        step={step}
        min={min}
        max={max}
        onChange={(values) => setValues(values)}
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
                labelFormatter={labelFormatter}
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
