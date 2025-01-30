"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
// import Card from "../homepage/Card";
import { Card, CardContent } from "../ui/card";
import { SkeletonCard } from "../skeleton/Skeleton";
import { AlertDestructive } from "@/components/Alert/AlertDestructive";
import { getNewArrivals } from "@/lib/actions";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export function NewArrivals() {
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  //   const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        setIsLoading(true);
        const data = await getNewArrivals();
        if (!data) throw new Error("Failed to fetch new arrivals");
        setNewArrivals(data);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNewArrivals();
  }, []);

  if (isLoading) return <SkeletonCard />;
  if (isError)
    return <AlertDestructive message="Failed to load new arrivals" />;

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {newArrivals.map((item) => (
        <Card key={item._id} className="cursor-pointer relative group">
          <CardContent
            style={{ backgroundImage: `url(${item.image_url})` }}
            className="bg-cover bg-center h-48 md:h-64 rounded-lg flex flex-col items-center justify-end p-4 text-white transition-all duration-300 group-hover:brightness-75"
          >
            {/* <h3 className="text-sm md:text-lg font-bold">{item.name}</h3> */}
            <Button
              variant={"outline"}
              className="text-sm md:text-lg text-black"
            >
              ₵{item.price}
            </Button>
            <Button
              className="bg-white text-black mt-2 hover:bg-gray-700 hover:text-white transition-colors duration-300"
              onClick={() => router.push(`${SERVER_URL}/products/${item._id}`)}
            >
              View Product
            </Button>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
