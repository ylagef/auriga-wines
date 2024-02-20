import React from "react";
import Skeleton from "react-loading-skeleton";

export const WineListSkeleton = () => {
  return (
    <div className="grid justify-center w-full grid-cols-3 gap-6 scroll-smooth">
      {Array.from({ length: 21 }).map((_, index) => (
        <div key={index} className="flex flex-col items-center w-full gap-2">
          <Skeleton height={240} containerClassName="w-1/2" />

          <Skeleton height={20} containerClassName="w-2/3" />

          <div className="w-4/5 grow">
            <Skeleton height={16} />
          </div>

          <Skeleton height={24} containerClassName="w-1/4" />
        </div>
      ))}
    </div>
  );
};
