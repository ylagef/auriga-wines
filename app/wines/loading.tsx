import { WineListSkeleton } from "@/components/skeletons/WineListSkeleton";
import React from "react";
import Skeleton from "react-loading-skeleton";

function WinesLoading() {
  return (
    <>
      <Skeleton height={21} />
      <WineListSkeleton />
    </>
  );
}

export default WinesLoading;
