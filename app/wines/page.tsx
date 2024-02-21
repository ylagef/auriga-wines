import FilterBar from "@/components/FilterBar";
import { WinesList } from "@/components/WinesList";
import { WineListSkeleton } from "@/components/skeletons/WineListSkeleton";
import { Suspense } from "react";

export interface SearchParams {
  countries?: string;
  grapes?: string;
  regions?: string;
  pairings?: string;
  cellars?: string;
  apellations?: string;
  sortBy?:
    | "price_asc"
    | "price_desc"
    | "year_asc"
    | "year_desc"
    | "created_at_asc"
    | "created_at_desc";
  name?: string;
  from_price?: string;
  to_price?: string;
}

async function WinesPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <>
      <div className="z-10 flex">
        <FilterBar />
      </div>

      <div className="mt-8 overflow-y-auto">
        <Suspense
          fallback={<WineListSkeleton />}
          key={JSON.stringify(searchParams)}
        >
          <WinesList searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
}

export default WinesPage;
