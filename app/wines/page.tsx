import FilterBar from "@/components/FilterBar";
import { WinesList } from "@/components/WinesList";
import { WineListSkeleton } from "@/components/skeletons/WineListSkeleton";
import { Suspense } from "react";

async function WinesPage({
  searchParams,
}: {
  searchParams: {
    countries?: string;
    grapes?: string;
    regions?: string;
    pairings?: string;
    cellars?: string;
    appellations?: string;
    sortBy?:
      | "price_asc"
      | "price_desc"
      | "year_asc"
      | "year_desc"
      | "created_at_asc"
      | "created_at_desc";
  };
}) {
  return (
    <>
      <div className="z-10 flex">
        <FilterBar searchParams={searchParams} />
      </div>

      <div className="px-2 mt-8 overflow-y-auto">
        <Suspense fallback={<WineListSkeleton />} key={searchParams.toString()}>
          <WinesList {...searchParams} />
        </Suspense>
      </div>
    </>
  );
}

export default WinesPage;
