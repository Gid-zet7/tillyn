import { Skeleton } from "@/components/ui/skeleton";

export function ProductSkeletonCard() {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-5 max-w-7xl">
      <div className="flex flex-col space-y-3 ">
        <Skeleton className="h-[300px] w-[350px] md:h-[600px] md:w-[800px] rounded-xl" />
      </div>

      <div className="space-y-2">
        <div className="space-y-2">
          <Skeleton className="h-4 w-[100px] md:w-[200px]" />
          <Skeleton className="h-4 w-[200px] md:w-[400px]" />
        </div>
        <Skeleton className="h-4 w-[180px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[200px] md:w-[400px]" />
        <Skeleton className="h-4 w-[200px] hidden md:block" />
        <Skeleton className="h-4 w-[200px] md:w-[400px] hidden md:block" />
        <Skeleton className="h-4 w-[200px] hidden md:block" />
        <Skeleton className="h-4 w-[200px] md:w-[400px] hidden md:block" />
        <Skeleton className="h-4 w-[200px] hidden md:block" />
        <Skeleton className="h-4 w-[200px] md:w-[400px] hidden md:block" />
        <Skeleton className="h-4 w-[200px] hidden md:block" />
        <Skeleton className="h-4 w-[200px] md:w-[400px] hidden md:block" />
        <Skeleton className="h-4 w-[200px] hidden md:block" />
        <Skeleton className="h-4 w-[200px] md:w-[400px] hidden md:block" />
        <Skeleton className="h-4 w-[200px] hidden md:block" />
        <Skeleton className="h-4 w-[200px] md:w-[400px] hidden md:block" />
        <Skeleton className="h-8 w-[350px] md:w-[600px] mt-20 rounded-full" />
      </div>
    </div>
  );
}
