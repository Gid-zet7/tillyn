import { Skeleton } from "@/components/ui/skeleton";

export function ProductSkeletonCard() {
  return (
    <div className="flex gap-5 max-w-7xl">
      <div className="flex flex-col space-y-3 ">
        <Skeleton className="h-[300px] w-[400px] rounded-xl" />
      </div>

      <div className="space-y-2">
        <div className="space-y-2">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[400px]" />
        </div>
        <Skeleton className="h-4 w-[180px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[400px]" />
        <Skeleton className="h-8 w-[800px] mt-20 rounded-full" />
      </div>
    </div>
  );
}
