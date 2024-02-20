import Skeleton from "react-loading-skeleton";

function WineDetailLoading() {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-4">
      <Skeleton height={384} width={100} />
      <Skeleton width={50} />
      <Skeleton width={50} />
      <Skeleton width={100} />
      <Skeleton width={200} />
      <Skeleton width={50} />
    </div>
  );
}

export default WineDetailLoading;
