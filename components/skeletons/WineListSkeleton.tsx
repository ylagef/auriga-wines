import React from "react";
import Skeleton from "react-loading-skeleton";

export const WineListSkeleton = () => {
  return (
    <div className="grid justify-center w-full grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 scroll-smooth">
      {Array.from({ length: 21 }).map((_, index) => (
        <div key={index} className="flex flex-col items-center w-full gap-2">
          <Skeleton height={230} containerClassName="w-1/2" />

          <Skeleton height={20} width={100} />
          <Skeleton height={20} containerClassName="w-2/3" />

          <Skeleton height={24} containerClassName="w-1/4" />
        </div>
      ))}
    </div>
  );
};
