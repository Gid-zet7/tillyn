import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

export function FeaturedSkeletonCard() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-3xl md:max-w-7xl"
    >
      <CarouselContent>
        {[...Array(6)].map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card className="relative overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-square relative">
                    <Skeleton className="absolute inset-0" />
                    {/* Overlay with shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skeleton-shine" />
                    {/* Content skeleton */}
                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-6 space-y-4">
                      <Skeleton className="h-6 w-24" /> {/* Price */}
                      <div className="space-y-2 w-full">
                        <Skeleton className="h-9 w-full" /> {/* Primary button */}
                        <Skeleton className="h-9 w-full" /> {/* Secondary button */}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
