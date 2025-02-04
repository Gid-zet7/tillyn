import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export function ProductSkeletonCard() {
  return (
    <div className="flex flex-col md:flex-row gap-8 max-w-7xl p-6">
      {/* Product Image Section */}
      <div className="w-full md:w-1/2">
        <Card className="relative overflow-hidden">
          <div className="aspect-square relative bg-muted/10 rounded-lg overflow-hidden">
            <Skeleton className="absolute inset-0" />
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skeleton-shine" />
          </div>
        </Card>
      </div>

      {/* Product Details Section */}
      <div className="w-full md:w-1/2 space-y-6">
        <div className="space-y-4">
          {/* Title and Rating */}
          <div className="space-y-2">
            <Skeleton className="h-8 w-3/4" /> {/* Title */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-24" /> {/* Rating */}
              <Skeleton className="h-4 w-32" /> {/* Review count */}
            </div>
          </div>

          {/* Price */}
          <div className="space-y-1">
            <Skeleton className="h-8 w-32" /> {/* Price */}
            <Skeleton className="h-4 w-24" /> {/* Stock status */}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-[95%]" />
            <Skeleton className="h-4 w-[85%]" />
          </div>

          {/* Features/Specs */}
          <div className="space-y-3 pt-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" /> {/* Bullet/Icon */}
              <Skeleton className="h-4 w-[80%]" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-[75%]" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-[85%]" />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-6">
          <Skeleton className="h-11 w-full rounded-lg" /> {/* Add to Cart */}
          <div className="flex gap-3">
            <Skeleton className="h-10 w-1/2 rounded-lg" /> {/* Quantity */}
            <Skeleton className="h-10 w-1/2 rounded-lg" /> {/* Buy Now */}
          </div>
        </div>

        {/* Additional Info */}
        <div className="space-y-2 pt-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5" /> {/* Icon */}
            <Skeleton className="h-4 w-40" /> {/* Shipping info */}
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5" /> {/* Icon */}
            <Skeleton className="h-4 w-48" /> {/* Return policy */}
          </div>
        </div>
      </div>
    </div>
  );
}
