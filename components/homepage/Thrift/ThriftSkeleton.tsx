import { Skeleton } from "@/components/ui/skeleton";

export function ThriftSkeletonCard() {
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col space-y-3 max-w-7xl">
        <Skeleton className="h-[300px] w-[800px] rounded-xl" />
        {/* <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div> */}
      </div>
    </div>
  );
}
