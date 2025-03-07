"use client";
import * as React from "react";
import { useDispatch } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { CheckCircle2 } from "lucide-react";
import { Button } from "../ui/button";
import { getPerfumes, getProductByCategory } from "@/lib/actions";
import { addToCart } from "@/redux/slices/cartSlice";
import { useRouter } from "next/navigation";
import { AlertDestructive } from "../Alert/AlertDestructive";
import { FeaturedSkeletonCard } from "../skeleton/FeaturedSkeleton";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export function PerfumeCarousel() {
  const { toast } = useToast();
  const [perfumes, setPerfumes] = React.useState<Product[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        setIsSuccess(false);

        const PerfumesData = await getPerfumes();

        if (!PerfumesData || PerfumesData.length === 0) {
          throw new Error("No perfume products found");
        }

        setPerfumes(PerfumesData);
        setIsSuccess(true);
      } catch {
        setIsError(true);
        setErrorMessage("Failed to fetch perfume products. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  let content;
  if (isLoading)
    content = (
      <section className="flex flex-col items-center justify-center">
        <FeaturedSkeletonCard />
      </section>
    );

  if (isError)
    content = (
      <section className="flex flex-col items-center justify-center px-2">
        <AlertDestructive message={errorMessage} />
      </section>
    );

  if (isSuccess) {
    content = (
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-3xl md:max-w-7xl"
      >
        <motion.div
          // className="flex flex-col md:flex-row h-screen w-screen"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            duration: 0.5,
            mass: 1,
            delay: 0.3,
          }}
        >
          <CarouselContent>
            {perfumes?.map((item: Product, index: number) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card>
                    <CardContent
                      style={{ backgroundImage: `url(${item.image_url})` }}
                      className={`relative bg-no-repeat bg-cover bg-center md:w-full h-1/2 md:h-full cursor-pointer flex aspect-square items-center justify-center rounded-lg p-6 group`}
                    >
                      {/* Overlay container for hover content */}
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity duration-300 rounded-lg">
                        {/* Display price */}
                        <p className="text-white text-lg font-semibold mb-2">
                          ₵{item.price}
                        </p>

                        {/* Add to Cart button */}
                        <div className="flex flex-col gap-2">
                          <Button
                            className="bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
                            onClick={() => {
                              dispatch(addToCart(item));
                              toast({
                                title: "Added product to cart ",
                                action: (
                                  <ToastAction altText="check">
                                    <CheckCircle2 />
                                  </ToastAction>
                                ),
                              });
                            }}
                          >
                            Add to Cart
                          </Button>
                          <Button
                            className="bg-black/50 text-white px-4 py-2 rounded-lg font-medium hover:bg-black transition-colors duration-200"
                            onClick={() =>
                              router.push(`${SERVER_URL}/products/${item._id}`)
                            }
                          >
                            View Product
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </motion.div>
        <CarouselPrevious className="hidden md:block" />
        <CarouselNext className="hidden md:block" />
      </Carousel>
    );
  }

  return <>{content}</>;
}
