import { Skeleton } from "@/components/ui/skeleton";

export function FeaturedSkeletonCard() {
  return (
    <div className=" flex gap-5 max-w-7xl">
      <div className="flex flex-col space-y-3 ">
        <Skeleton className="h-[300px] w-[400px] rounded-xl" />
      </div>
      <div className="flex flex-col space-y-3 max-w-7xl">
        <Skeleton className="h-[300px] w-[400px] rounded-xl" />
      </div>
      <div className="flex flex-col space-y-3 max-w-7xl">
        <Skeleton className="h-[300px] w-[400px] rounded-xl" />
      </div>
    </div>
  );
}
